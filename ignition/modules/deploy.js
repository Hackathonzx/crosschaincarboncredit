const hre = require("hardhat");

async function main() {
  const priceOracleAddress = "0x5498BB86BC934c8D34FDA08E81D444153d0D06aD"; // chainlink price feed
  
  console.log("Deploying ICM Router...");
  const ICMRouter = await hre.ethers.getContractFactory("ICMRouter");
  const icmRouter = await ICMRouter.deploy();
  await icmRouter.waitForDeployment();
  console.log("ICM Router deployed to:", await icmRouter.getAddress());

  // Deploy CarbonCredit contract
  console.log("Deploying CarbonCredit...");
  const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy();
  await carbonCredit.waitForDeployment();
  console.log("CarbonCredit deployed to:", await carbonCredit.getAddress());

  // Deploy ICMHandler contract
  console.log("Deploying ICMHandler...");
  const ICMHandler = await hre.ethers.getContractFactory("ICMHandler");
  const icmRouterAddress = "0xe9dE092AAfEEF452EA20f84816D96598cD5023c2"; // ICM Router address
  const carbonCreditAddress = "0xd52D2CA7975Cfbc3342863A1B76d21104a5C8266";
  const icmHandler = await ICMHandler.deploy(icmRouterAddress, carbonCredit.address);
  await icmHandler.waitForDeployment();
  console.log("ICMHandler deployed to:", await icmHandler.getAddress());

  // Deploy Marketplace contract (optional)
  console.log("Deploying Marketplace...");
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(carbonCredit.address, priceOracle.address);
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed to:", await marketplace.getAddress);

  console.log("Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
