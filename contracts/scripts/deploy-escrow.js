const hre = require("hardhat");

async function main() {
  const [owner, beneficiary] = await hre.ethers.getSigners();
  const Factory = await hre.ethers.getContractFactory("CampaignFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  const tx = await factory.deployCampaign(
    "local-campaign",
    beneficiary.address,
    hre.ethers.parseEther("1"),
    0
  );
  const receipt = await tx.wait();
  const event = receipt.logs
    .map((log) => {
      try {
        return factory.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((entry) => entry?.name === "CampaignDeployed");

  console.log(`Escrow deployed by ${owner.address} to ${event.args.escrowAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
