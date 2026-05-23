const { prisma } = require("../config/prisma");
const { deployCampaignEscrow } = require("../services/contractService");
const { sendCampaignRejectedEmail } = require("../services/emailService");

async function listCampaigns(req, res) {
  const { status = "PENDING_REVIEW", search } = req.query;
  const campaigns = await prisma.campaign.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { healthCondition: { contains: search, mode: "insensitive" } }
            ]
          }
        : {})
    },
    include: { campaigner: { select: { email: true, profile: true } } },
    orderBy: { updatedAt: "desc" }
  });

  return res.json({ campaigns });
}

async function getCampaign(req, res) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: req.params.id },
    include: {
      mediaFiles: true,
      updates: true,
      donations: true,
      campaigner: { select: { email: true, profile: true } }
    }
  });

  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  return res.json({ campaign });
}

async function approveCampaign(req, res) {
  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  if (!campaign.walletAddress) {
    return res.status(400).json({ message: "Campaign wallet address is required before approval" });
  }

  const contractAddress = await deployCampaignEscrow(campaign);
  const updated = await prisma.campaign.update({
    where: { id: campaign.id },
    data: {
      status: "ACTIVE",
      reviewedBy: req.user.sub,
      reviewedAt: new Date(),
      contractAddress: contractAddress || campaign.contractAddress
    }
  });

  return res.json({ campaign: updated });
}

async function rejectCampaign(req, res) {
  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });

  const updated = await prisma.campaign.update({
    where: { id: campaign.id },
    data: {
      status: "REJECTED",
      adminNotes: req.validated.body.notes,
      reviewedBy: req.user.sub,
      reviewedAt: new Date()
    }
  });

  await sendCampaignRejectedEmail(updated);
  return res.json({ campaign: updated });
}

async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      isEmailVerified: true,
      createdAt: true,
      profile: true
    },
    orderBy: { createdAt: "desc" }
  });

  return res.json({ users });
}

async function changeUserRole(req, res) {
  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role: req.validated.body.role },
    select: { id: true, email: true, role: true }
  });

  return res.json({ user });
}

module.exports = {
  approveCampaign,
  changeUserRole,
  getCampaign,
  listCampaigns,
  listUsers,
  rejectCampaign
};
