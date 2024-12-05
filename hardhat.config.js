require("@nomicfoundation/hardhat-ethers");
require('@nomicfoundation/hardhat-toolbox');
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const { RPC_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.8.0",
  networks: {
    AvalancheFuji: {
      url: process.env.RPC_URL,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  // etherscan: {
  //   apiKey: {
  //     snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
  //   },
  //   customChains: [
  //     {
  //       network: "snowtrace",
  //       chainId: 43113,
  //       urls: {
  //         apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
  //         browserURL: "https://avalanche.testnet.localhost:8080"
  //       }
  //     }
  //   ]
  // },
  // networks: {
  //   snowtrace: {
  //     url: 'https://api.avax-test.network/ext/bc/C/rpc',
  //     accounts: [process.env.PRIVATE_KEY]
  //   },
  // },
} 