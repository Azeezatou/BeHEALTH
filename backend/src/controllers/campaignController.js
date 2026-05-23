const { prisma } = require("../config/prisma");
const { notifyAdminsOfCampaign } = require("../services/emailService");
const { serializeCampaign } = require("../utils/campaignSerializer");

async function listCampaigns(req, res) {
  const { healthCondition, search, status = "ACTIVE" } = req.query;
  const campaigns = await prisma.campaign.findMany({
    where: {
      status,
      ...(healthCondition ? { healthCondition } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } }
            ]
          }
        : {})
    },
    include: { mediaFiles: true, updates: true },
    orderBy: { createdAt: "desc" }
  });

  return res.json({ campaigns: campaigns.map((campaign) => serializeCampaign(campaign, req.user)) });
}

async function getCampaign(req, res) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: req.params.id },
    include: { mediaFiles: true, updates: true, campaigner: { select: { email: true, profile: true } } }
  });

  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  return res.json({ campaign: serializeCampaign(campaign, req.user) });
}

async function createCampaign(req, res) {
  const campaign = await prisma.campaign.create({
    data: {
      ...req.validated.body,
      campaignerId: req.user.sub,
      status: "DRAFT"
    }
  });

  return res.status(201).json({ campaign });
}

async function updateCampaign(req, res) {
  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  if (campaign.campaignerId !== req.user.sub) return res.status(403).json({ message: "Not campaign owner" });
  if (!["DRAFT", "REJECTED"].includes(campaign.status)) {
    return res.status(409).json({ message: "Only draft or rejected campaigns can be edited" });
  }

  const updated = await prisma.campaign.update({
    where: { id: campaign.id },
    data: req.validated.body
  });

  return res.json({ campaign: updated });
}

async function submitCampaign(req, res) {
  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  if (campaign.campaignerId !== req.user.sub) return res.status(403).json({ message: "Not campaign owner" });

  const updated = await prisma.campaign.update({
    where: { id: campaign.id },
    data: { status: "PENDING_REVIEW" }
  });

  await notifyAdminsOfCampaign(updated);
  return res.json({ campaign: updated });
}

async function uploadMedia(req, res) {
  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  if (campaign.campaignerId !== req.user.sub) return res.status(403).json({ message: "Not campaign owner" });

  const files = req.files || [];
  const mediaFiles = await Promise.all(
    files.map((file) =>
      prisma.mediaFile.create({
        data: {
          campaignId: campaign.id,
          url: file.path || file.filename,
          type: file.mimetype?.startsWith("image/") ? "image" : "document",
          label: file.originalname
        }
      })
    )
  );

  return res.status(201).json({ mediaFiles });
}

async function createUpdate(req, res) {
  const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  if (campaign.campaignerId !== req.user.sub) return res.status(403).json({ message: "Not campaign owner" });

  const update = await prisma.campaignUpdate.create({
    data: { campaignId: campaign.id, content: req.validated.body.content }
  });

  return res.status(201).json({ update });
}

async function listUpdates(req, res) {
  const updates = await prisma.campaignUpdate.findMany({
    where: { campaignId: req.params.id },
    orderBy: { createdAt: "desc" }
  });

  return res.json({ updates });
}

async function myCampaigns(req, res) {
  const campaigns = await prisma.campaign.findMany({
    where: { campaignerId: req.user.sub },
    orderBy: { createdAt: "desc" }
  });

  return res.json({ campaigns });
}

module.exports = {
  createCampaign,
  createUpdate,
  getCampaign,
  listCampaigns,
  listUpdates,
  myCampaigns,
  submitCampaign,
  updateCampaign,
  uploadMedia
};
