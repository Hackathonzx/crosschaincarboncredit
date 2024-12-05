const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Real Estate Smart Contracts", function () {
  let PropertyNFT, FractionalOwnership, TransactionHandler;
  let propertyNFT, fractionalOwnership, transactionHandler;
  let owner, user1, user2, user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy PropertyNFT
    PropertyNFT = await ethers.getContractFactory("PropertyNFT");
    propertyNFT = await PropertyNFT.deploy();
    await propertyNFT.waitForDeployment();

    // Deploy FractionalOwnership
    FractionalOwnership = await ethers.getContractFactory("FractionalOwnership");
    fractionalOwnership = await FractionalOwnership.deploy();
    await fractionalOwnership.waitForDeployment();

    // Deploy TransactionHandler
    TransactionHandler = await ethers.getContractFactory("TransactionHandler");
    transactionHandler = await TransactionHandler.deploy();
    await transactionHandler.waitForDeployment();
  });

  describe("PropertyNFT Contract", function () {
    it("should mint a property NFT", async function () {
      const metadata = "https://property.example/metadata.json";
      const value = 1000;

      await propertyNFT.connect(owner).mintProperty(user1.address, value, metadata);
      const tokenId = 0;

      expect(await propertyNFT.ownerOf(tokenId)).to.equal(user1.address);
      expect(await propertyNFT.propertyValue(tokenId)).to.equal(value);
    });

    it("should update property value", async function () {
      const metadata = "https://property.example/metadata.json";
      const initialValue = 1000;
      const updatedValue = 2000;

      await propertyNFT.connect(owner).mintProperty(user1.address, initialValue, metadata);
      const tokenId = 0;

      await propertyNFT.connect(owner).updatePropertyValue(tokenId, updatedValue);

      expect(await propertyNFT.propertyValue(tokenId)).to.equal(updatedValue);
    });

    it("should revert when a non-owner tries to update value", async function () {
      await expect(
        propertyNFT.connect(user1).updatePropertyValue(0, 2000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("FractionalOwnership Contract", function () {
    let fractionalOwnership, owner, addr1, addr2;
    const propertyId = 1;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        const FractionalOwnership = await ethers.getContractFactory("FractionalOwnership");
        fractionalOwnership = await FractionalOwnership.deploy();
        await fractionalOwnership.waitForDeployment();
    });

    it("should issue fractional ownership shares", async function () {
        // Issue shares by contract owner
        await fractionalOwnership.issueShare(propertyId, addr1.address, 60);
        await fractionalOwnership.issueShare(propertyId, addr2.address, 40);

        // Retrieve and verify shares
        const shares = await fractionalOwnership.getPropertyShares(propertyId);
        expect(shares.length).to.equal(2);
        expect(shares[0].owner).to.equal(addr1.address);
        expect(shares[0].percentage).to.equal(60);
        expect(shares[1].owner).to.equal(addr2.address);
        expect(shares[1].percentage).to.equal(40);
    });

    it("should register a fractional owner", async function () {
        // Issue a share
        await fractionalOwnership.issueShare(propertyId, addr1.address, 100);

        // Check if owner is registered
        const isOwner = await fractionalOwnership.ownsShare(propertyId, addr1.address);
        expect(isOwner).to.be.true;
    });

    it("should allow a fractional owner to vote", async function () {
        // Issue a share to addr1
        await fractionalOwnership.issueShare(propertyId, addr1.address, 100);

        // Vote on a decision
        await fractionalOwnership.connect(addr1).voteOnDecision(propertyId, "sell");

        // Verify event was emitted (you might want to add more specific checks)
        // Note: This test assumes you're checking event emission in your actual implementation
    });

    it("should prevent non-owners from voting", async function () {
        // Try to vote without owning a share
        await expect(
            fractionalOwnership.connect(addr1).voteOnDecision(propertyId, "sell")
        ).to.be.revertedWith("You must own a share to vote");
    });

    it("should prevent duplicate voting", async function () {
        // Issue a share to addr1
        await fractionalOwnership.issueShare(propertyId, addr1.address, 100);

        // First vote should succeed
        await fractionalOwnership.connect(addr1).voteOnDecision(propertyId, "sell");

        // Second vote should fail
        await expect(
            fractionalOwnership.connect(addr1).voteOnDecision(propertyId, "improve")
        ).to.be.revertedWith("You have already voted");
    });
});

  describe("TransactionHandler Contract", function () {
    let transactionHandler, owner, addr1, addr2;
    const propertyId = 1;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        const TransactionHandler = await ethers.getContractFactory("TransactionHandler");
        transactionHandler = await TransactionHandler.deploy();
        await transactionHandler.waitForDeployment();
    });

    it("should register a fractional owner", async function () {
        // Register owners with different percentages
        await transactionHandler.registerOwner(propertyId, addr1.address, 60);
        await transactionHandler.registerOwner(propertyId, addr2.address, 40);

        // Verify owners
        const owners = await transactionHandler.getOwners(propertyId);
        expect(owners.length).to.equal(2);
        expect(owners[0]).to.equal(addr1.address);
        expect(owners[1]).to.equal(addr2.address);

        // Verify share percentages
        const addr1Percentage = await transactionHandler.sharePercentages(propertyId, addr1.address);
        const addr2Percentage = await transactionHandler.sharePercentages(propertyId, addr2.address);
        expect(addr1Percentage).to.equal(60);
        expect(addr2Percentage).to.equal(40);
    });

    it("should distribute rental income to fractional owners", async function () {
        // Register owners
        await transactionHandler.registerOwner(propertyId, addr1.address, 60);
        await transactionHandler.registerOwner(propertyId, addr2.address, 40);

        // Track initial balances
        const initialAddr1Balance = await ethers.provider.getBalance(addr1.address);
        const initialAddr2Balance = await ethers.provider.getBalance(addr2.address);

        // Distribute rental income (1 ether)
        const rentalIncome = ethers.parseEther("1");
        await transactionHandler.distributeRentalIncome(propertyId, { value: rentalIncome });

        // Check updated balances
        const expectedAddr1Share = rentalIncome * 60n / 100n;
        const expectedAddr2Share = rentalIncome * 40n / 100n;

        const finalAddr1Balance = await ethers.provider.getBalance(addr1.address);
        const finalAddr2Balance = await ethers.provider.getBalance(addr2.address);

        expect(finalAddr1Balance).to.be.closeTo(
            initialAddr1Balance + expectedAddr1Share, 
            ethers.parseEther("0.01")
        );
        expect(finalAddr2Balance).to.be.closeTo(
            initialAddr2Balance + expectedAddr2Share, 
            ethers.parseEther("0.01")
        );
    });

    it("should revert if no rental income is provided", async function () {
        // Register an owner
        await transactionHandler.registerOwner(propertyId, addr1.address, 100);

        // Try to distribute zero income
        await expect(
            transactionHandler.distributeRentalIncome(propertyId)
        ).to.be.revertedWith("No rental income to distribute");
    });
  })  
});
