const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Carbon Credit Platform", function () {
  let owner, user1, user2;
  let CarbonCredit, carbonCredit;
  let Marketplace, marketplace;
  let ICMHandler, icmHandler;
  let icmRouterAddress = "0xe9dE092AAfEEF452EA20f84816D96598cD5023c2"; // Mock address for testing

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy CarbonCredit contract
    CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    carbonCredit = await CarbonCredit.deploy(); // No arguments
    await carbonCredit.waitForDeployment(); // Correct way to wait for deployment

    // Deploy Marketplace contract
    Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(carbonCredit.address);
    await marketplace.waitForDeployment();

    // Deploy ICMHandler contract
    ICMHandler = await ethers.getContractFactory("ICMHandler");
    icmHandler = await ICMHandler.deploy(icmRouterAddress, carbonCredit.address);
    await icmHandler.waitForDeployment();
  });

  describe("CarbonCredit Contract", function () {
    it("Should mint tokens", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 1000);
      const balance = await carbonCredit.balanceOf(user1.address);
      expect(balance).to.equal(1000);
    });

    it("Should burn tokens", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 1000);
      await carbonCredit.connect(owner).burn(user1.address, 500);
      const balance = await carbonCredit.balanceOf(user1.address);
      expect(balance).to.equal(500);
    });

    it("Should not allow unauthorized minting", async function () {
      await expect(
        carbonCredit.connect(user1).mint(user1.address, 1000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should not allow unauthorized burning", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 500);
      await expect(
        carbonCredit.connect(user1).burn(user1.address, 1000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Marketplace Contract", function () {
    it("Should list a carbon credit for sale", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 1000);
      await carbonCredit.connect(user1).approve(marketplace.address, 500);
      await marketplace.connect(user1).listCredit(500, ethers.utils.parseEther("1"));

      const listing = await marketplace.getListing(0);
      expect(listing.seller).to.equal(user1.address);
      expect(listing.amount).to.equal(500);
    });

    it("Should allow a user to purchase a listed carbon credit", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 1000);
      await carbonCredit.connect(user1).approve(marketplace.address, 500);
      await marketplace.connect(user1).listCredit(500, ethers.utils.parseEther("1"));

      await marketplace.connect(user2).buyCredit(0, { value: ethers.utils.parseEther("1") });
      const user2Balance = await carbonCredit.balanceOf(user2.address);
      expect(user2Balance).to.equal(500);
    });

    it("Should not allow purchase without enough funds", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 1000);
      await carbonCredit.connect(user1).approve(marketplace.address, 500);
      await marketplace.connect(user1).listCredit(500, ethers.utils.parseEther("1"));

      await expect(
        marketplace.connect(user2).buyCredit(0, { value: ethers.utils.parseEther("0.5") })
      ).to.be.revertedWith("Insufficient payment");
    });
  });

  describe("ICMHandler Contract", function () {
    it("Should transfer credits across chains", async function () {
      await carbonCredit.connect(owner).mint(user1.address, 1000);
      await carbonCredit.connect(user1).approve(icmHandler.address, 500);

      await expect(icmHandler.connect(user1).transferCredit(user2.address, 500, 12345))
        .to.emit(icmHandler, "CrossChainTransfer")
        .withArgs(user1.address, user2.address, 500, 12345);
    });

    it("Should handle cross-chain messages and mint credits", async function () {
      await icmHandler.handleCrossChainMessage(user1.address, user2.address, 500);
      const balance = await carbonCredit.balanceOf(user2.address);
      expect(balance).to.equal(500);
    });

    it("Should not allow unauthorized cross-chain messages", async function () {
      await expect(
        icmHandler.connect(user1).handleCrossChainMessage(user1.address, user2.address, 500)
      ).to.be.revertedWith("Unauthorized caller");
    });
  });
});
