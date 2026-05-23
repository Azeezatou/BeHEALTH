require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.ETHEREUM_RPC_URL || "",
      accounts: privateKey ? [privateKey] : []
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "",
      accounts: privateKey ? [privateKey] : []
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || ""
    }
  }
};
