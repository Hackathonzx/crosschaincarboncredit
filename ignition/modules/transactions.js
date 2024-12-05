async function main() {
    const [owner] = await ethers.getSigners();
    console.log("Owner address:", owner.address);

    const propertyNFTAddress = "0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55";
    const transactionHandlerAddress = "0x2479eb1a719799D2956bB80551d9FA1aF46b0560";

    const PropertyNFT = await ethers.getContractAt("PropertyNFT", propertyNFTAddress);
    const TransactionHandler = await ethers.getContractAt("TransactionHandler", transactionHandlerAddress);

    // Use a predefined address for user1 instead of getting from signers
    const user1Address = "0xF78391F0992E80959fe3Fe55340270D26C56E3Ae"; // Replace with an actual address you want to use

    console.log("Minting Property NFT...");
    const metadata = "https://property.example/metadata.json";
    const value = 1000;

    // Mint a property NFT to user1
    const tx1 = await PropertyNFT.connect(owner).mintProperty(user1Address, value, metadata);
    await tx1.wait();
    console.log("Transaction 1 successful:", tx1.hash);

    console.log("Registering fractional owner...");
    // Register user1 as a fractional owner with 50% ownership
    const tx2 = await TransactionHandler.connect(owner).registerOwner(1, user1Address, 50);
    await tx2.wait();
    console.log("Transaction 2 successful:", tx2.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});