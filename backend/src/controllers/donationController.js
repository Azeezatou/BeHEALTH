const { prisma } = require("../config/prisma");

async function initiate(req, res) {
  const { campaignId, amount } = req.validated.body;
  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, status: "ACTIVE" }
  });

  if (!campaign) return res.status(404).json({ message: "Active campaign not found" });

  const reference = `BH-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const donation = await prisma.donation.create({
    data: {
      donorId: req.user.sub,
      campaignId,
      amount,
      paystackRef: reference,
      channel: "FIAT_PAYSTACK",
      status: "PENDING"
    }
  });

  return res.status(201).json({
    donation,
    payment: {
      reference,
      authorizationUrl: null,
      message: "Wire Paystack initialization here when PAYSTACK_SECRET_KEY is configured"
    }
  });
}

async function verify(req, res) {
  const donation = await prisma.donation.findFirst({
    where: { paystackRef: req.params.reference },
    include: { campaign: true }
  });

  if (!donation) return res.status(404).json({ message: "Donation reference not found" });

  const updated = await prisma.$transaction(async (tx) => {
    const confirmed = await tx.donation.update({
      where: { id: donation.id },
      data: { status: "CONFIRMED" }
    });

    const campaign = await tx.campaign.update({
      where: { id: donation.campaignId },
      data: {
        raisedAmount: { increment: donation.amount },
        donorCount: { increment: 1 }
      }
    });

    if (campaign.raisedAmount.greaterThanOrEqualTo(campaign.targetAmount)) {
      await tx.campaign.update({
        where: { id: campaign.id },
        data: { status: "FUNDED" }
      });
    }

    return confirmed;
  });

  return res.json({ donation: updated });
}

async function logCrypto(req, res) {
  const { campaignId, txHash, chain, amount } = req.validated.body;
  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, status: "ACTIVE" }
  });

  if (!campaign) return res.status(404).json({ message: "Active campaign not found" });

  const donation = await prisma.$transaction(async (tx) => {
    const created = await tx.donation.create({
      data: {
        donorId: req.user.sub,
        campaignId,
        amount,
        txHash,
        chain,
        currency: "ETH",
        channel: "CRYPTO_ONCHAIN",
        status: "CONFIRMED"
      }
    });

    await tx.campaign.update({
      where: { id: campaignId },
      data: {
        raisedAmount: { increment: amount },
        donorCount: { increment: 1 }
      }
    });

    return created;
  });

  return res.status(201).json({ donation });
}

async function myDonations(req, res) {
  const donations = await prisma.donation.findMany({
    where: { donorId: req.user.sub },
    include: { campaign: { select: { id: true, name: true, healthCondition: true } } },
    orderBy: { createdAt: "desc" }
  });

  return res.json({ donations });
}

module.exports = { initiate, logCrypto, myDonations, verify };
