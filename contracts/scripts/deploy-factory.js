const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("CampaignFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  console.log(`CampaignFactory deployed to ${await factory.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
