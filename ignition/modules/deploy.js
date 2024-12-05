const hre = require("hardhat");

async function main() {
  // Deploy PropertyNFT contract
  const PropertyNFT = await hre.ethers.getContractFactory("PropertyNFT");
  const propertyNFT = await PropertyNFT.deploy();
  await propertyNFT.waitForDeployment(); // for ether v6
  console.log("PropertyNFT deployed to:", await propertyNFT.getAddress());

  // Deploy FractionalOwnership contract
  const FractionalOwnership = await hre.ethers.getContractFactory("FractionalOwnership");
  const fractionalOwnership = await FractionalOwnership.deploy();
  await fractionalOwnership.waitForDeployment();
  console.log("FractionalOwnership deployed to:", await fractionalOwnership.getAddress());

  // Deploy TransactionHandler contract
  const TransactionHandler = await hre.ethers.getContractFactory("TransactionHandler");
  const transactionHandler = await TransactionHandler.deploy();
  await transactionHandler.waitForDeployment();
  console.log("TransactionHandler deployed to:", await transactionHandler.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
