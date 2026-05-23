async function deployCampaignEscrow(campaign) {
  if (!process.env.FACTORY_CONTRACT_ADDRESS || !process.env.DEPLOYER_PRIVATE_KEY) {
    console.warn("Skipping escrow deployment because contract environment is not configured.");
    return null;
  }

  const { ethers } = require("ethers");
  const factoryArtifact = require("../../../contracts/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json");

  const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
  const signer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
  const factory = new ethers.Contract(
    process.env.FACTORY_CONTRACT_ADDRESS,
    factoryArtifact.abi,
    signer
  );

  const goalInWei = ethers.parseEther(campaign.targetAmount.toString());
  const deadlineTimestamp = campaign.targetDate
    ? Math.floor(new Date(campaign.targetDate).getTime() / 1000)
    : 0;

  const tx = await factory.deployCampaign(
    campaign.id,
    campaign.walletAddress,
    goalInWei,
    deadlineTimestamp
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

  return event?.args?.escrowAddress || null;
}

module.exports = { deployCampaignEscrow };
