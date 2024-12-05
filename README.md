Carbon Credit Interoperability Platform
Overview
The Carbon Credit Interoperability Platform is a decentralized infrastructure for tokenizing, trading, and transferring carbon credits across Avalanche blockchain subnets. Leveraging Avalanche's Interchain Messaging Protocol (ICM) and a suite of purpose-built smart contracts, the platform enhances the scalability and interoperability of carbon credit systems in a multichain ecosystem.

Project Vision
To facilitate a seamless, transparent, and scalable marketplace for carbon credits by leveraging blockchain interoperability, thereby advancing global sustainability efforts.

Key Features
Carbon Credit Tokenization

Carbon credits are tokenized as ERC20 tokens, enabling standardized trading and tracking.
Decentralized Marketplace

A robust platform for listing, buying, and selling carbon credits with dynamic price updates through oracles.
Cross-Chain Transfers

Enables users to transfer carbon credits between Avalanche subnets using the Interchain Messaging Protocol (ICM).
Oracle Integration

Real-time pricing and market data updates via Avalanche-native ICTT oracles.
Modular and Scalable Architecture

Built to adapt and scale across additional blockchain environments, ensuring flexibility for future enhancements.
Smart Contracts
CarbonCredit.sol

Purpose: Tokenizes carbon credits as ERC20 tokens.
Features: Minting, burning, and transferring tokens.
Marketplace.sol

Purpose: Decentralized trading marketplace for carbon credits.
Features:
Listing and purchasing carbon credits.
Price tracking using an ICTT oracle.
ICMHandler.sol

Purpose: Handles all cross-chain messaging for carbon credit transfers.
Features:
Encoding, relaying, and execution of ICM messages.
Minting tokens on target chains after successful cross-chain transfers.
PriceOracle.sol

Purpose: Updates real-time prices of carbon credits using Avalanche-native oracle services.
Technologies Used
Blockchain: Avalanche Subnets
Smart Contract Language: Solidity
Tools & Frameworks:
Hardhat (development and testing)
OpenZeppelin (contract security and standards)
Avalanche ICM (Interchain Messaging Protocol)
Deployment Guide
Prerequisites

Node.js installed
Hardhat installed globally or in your project
Avalanche network wallet and RPC configuration
Deployment Steps

Install dependencies:

bash
Copy code
npm install
Compile contracts:

bash
Copy code
npx hardhat compile
Deploy contracts:

bash
Copy code
npx hardhat run scripts/deploy.js --network <network>
Replace <network> with the desired network (e.g., fuji or mainnet).

Note down the deployed contract addresses for CarbonCredit, Marketplace, and ICMHandler.

How to Use the Platform
Tokenize Carbon Credits
Use the mint function in CarbonCredit.sol to create new carbon credit tokens.
Burn tokens via the burn function to account for used credits.
Trade Carbon Credits
Sellers list carbon credits for sale via the listCredit function in Marketplace.sol.
Buyers purchase credits using the buyCredit function.
Transfer Credits Cross-Chain
Initiate a cross-chain transfer using transferCredit in ICMHandler.sol.
The ICM Router relays messages to mint tokens on the target chain.
Testing
Run unit tests for all smart contracts:

bash
Copy code
npx hardhat test
Verify the following functionalities:

Carbon credit minting, burning, and transferring.
Marketplace listing and buying.
Cross-chain transfer of tokens.
Future Enhancements
Multi-Chain Expansion

Integrate with non-Avalanche blockchains using additional cross-chain protocols.
Reputation System

Implement user reputation tracking for sellers to enhance marketplace reliability.
Dynamic Pricing Algorithms

Incorporate machine learning for better price forecasting based on market trends.
Decentralized Governance

Introduce DAO-like mechanisms for carbon credit allocation and policy-making.
Target Audience
Environmental organizations and carbon offset providers.
Businesses seeking transparent carbon credit systems.
Developers and users in blockchain-based sustainability initiatives.
Contributing
We welcome contributions from developers and environmental advocates. Please submit pull requests or open issues on the repository to propose changes or enhancements.

Contact
For inquiries or collaboration, contact [Your Name/Organization] at [Your Email Address].


priceOracle - 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD // avax/usd

ICM Router deployed to: 0xe9dE092AAfEEF452EA20f84816D96598cD5023c2
CarbonCredit deployed to: 0xd52D2CA7975Cfbc3342863A1B76d21104a5C8266
ICMHandler deployed to: 0x41b5Cc57269f5E2AC278B860373a812f527daE7a
Marketplace deployed to: 0xaC41d927189A00f92133EF6c56f447058FD4ed58


**Installation**
- Clone the repository:

   - git clone https://github.com/TechnoShe/BNBPropertyLink.git

   -  cd BNBPropertyLink

- Install dependencies:
   - npm install

- Configuration
   - Create a .env file in the root directory with the following:

   - PRIVATE_KEY=<YourPrivateKey>
   - RPC_URL=<YOURRPCURL>
   - Replace <YourPrivateKey> and <RPC_URL> with the appropriate values.

# Deployment
- Compile contracts:
   - npx hardhat compile
- Deploy all three contracts to the opBNB Testnet:
   - npx hardhat run ignition/modules/deploy.js --network opBNBTestnet

- This script will:
   - Deploy PropertyNFT, FractionalOwnership, and TransactionHandler.

- Log the contract addresses in the console.

   - PropertyNFT deployed to: 0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55
   - FractionalOwnership deployed to: 0xf1979Ac32D086D1f3f3773fe0828d37729ed545f
   - TransactionHandler deployed to: 0x2479eb1a719799D2956bB80551d9FA1aF46b0560

- verify the contract addresses by running:

npx hardhat verify --network opBNBTestnet (contract-address) (argument)

- Successfully verified contract PropertyNFT on the block explorer.

   - https://testnet.opbnbscan.com/address/0xA0BF7F60ec762cc7b88dEc415D46F12cFF130a55#code

- Successfully verified contract FractionalOwnership on the block explorer.
   - https://testnet.opbnbscan.com/address/0xf1979Ac32D086D1f3f3773fe0828d37729ed545f#code

- Successfully verified contract TransactionHandler on the block explorer.

   - https://testnet.opbnbscan.com/address/0x2479eb1a719799D2956bB80551d9FA1aF46b0560#code

# Testing

Test all cases of the contract by running:
- npx hardhat test
- Here are the test coverage:

Real Estate Smart Contracts

    PropertyNFT Contract

      ✔ should mint a property NFT (69ms)

      ✔ should update property value

      ✔ should revert when a non-owner tries to update value (53ms)

    FractionalOwnership Contract

      ✔ should issue fractional ownership shares (43ms)

      ✔ should register a fractional owner

      ✔ should allow a fractional owner to vote

      ✔ should prevent non-owners from voting

      ✔ should prevent duplicate voting

    TransactionHandler Contract

      ✔ should register a fractional owner (38ms)

      ✔ should distribute rental income to fractional owners

      ✔ should revert if no rental income is provided


  11 passing (4s)


# Testing Transactions
- Run the transaction script to interact with the deployed contracts:

   - npx hardhat run ignition/modules/transactions.js --network opBNBTestnet

**outcomes:**

Minting Property NFT...

Transaction 1 successful: 0xc1e64ff820dde0f9c06389bf2669b2c002a187e42e670fd3426c60c260a84e9e

Registering fractional owner...

Transaction 2 successful: 0xf9f67d69cc6c2abfddd9ee76431ede7bdb11fbc7301db8cb1fc58f15a3ebaf7a


# Usage Instructions
1. Mint a Property NFT
- Use the mintProperty function in the PropertyNFT contract to tokenize a property:

```javascript
const tx = await propertyNFT.mintProperty(
  "0xOwnerAddress",
  100000, // Initial property value
  "ipfs://QmMetadataHash" // Metadata URI
);
await tx.wait();
```

2. Register Fractional Ownership
- Use the registerOwner function in the TransactionHandler contract:

```javascript
const tx = await transactionHandler.registerOwner(
  1, // Property ID
  "0xFractionalOwnerAddress",
  20 // Ownership percentage
);
await tx.wait();
```

3. Distribute Rental Income
- Use the distributeRentalIncome function in the TransactionHandler contract:

```javascript
const tx = await transactionHandler.distributeRentalIncome(1, {
  value: ethers.utils.parseEther("1.0") // Rental income in ETH
});
await tx.wait();
```

4. Governance Voting
- Use the voteOnDecision function in the FractionalOwnership contract:

```javascript
const tx = await fractionalOwnership.voteOnDecision(
  1, // Property ID
  "Sell" // Decision
);
await tx.wait();
```

# Business Model

- Revenue Streams
   - Transaction Fees: Fees for minting property NFTs and registering fractional owners.
   - Premium Features: Advanced features like governance analytics for fractional owners.

- Scalability
   - Integrate with government land registries for official real-world adoption.
   - Add cross-chain compatibility for interoperability with other ecosystems.

# Technical Innovations
- Fractional Ownership: Programmable property rights for multiple owners.
- Transparency: Immutable, tamper-proof transaction records on the blockchain.
- Efficiency: Streamlined processes reduce time and costs in real estate transactions.

# Roadmap
- Short-term Goals (0–1 months):
   - Add enhanced search and filter options for properties.
   - Integrate decentralized storage (IPFS) for property metadata.

- Long-term Goals (1–3 months):
   - Build partnerships with government land registries for real-world adoption.
   - Add cross-chain functionality to expand to other blockchain networks.

# Contact
- Developer: uthman fatima
- Email: futhmah456@gmail.com
- GitHub: https://github.com/Jumcee
- Twitter: 




Demo Video

- Record a short demo video showcasing the platform, highlighting:
- Deployment and transaction execution (you can show Etherscan or logs).
- Key features like minting NFTs and registering fractional owners.
- Keep it concise (2–3 minutes).


Tweet
