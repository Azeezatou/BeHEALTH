const PRIVATE_CAMPAIGN_FIELDS = [
  "doctorPhone",
  "doctorEmail",
  "patientFamilyName",
  "patientFamilyPhone",
  "patientFamilyRelation",
  "bankName",
  "accountNumber",
  "accountName",
  "adminNotes",
  "reviewedBy",
  "reviewedAt"
];

function serializeCampaign(campaign, viewer) {
  if (!campaign) return campaign;

  const isOwner = viewer?.id && viewer.id === campaign.campaignerId;
  const isAdmin = viewer?.role === "ADMIN";
  const output = { ...campaign };

  if (!isOwner && !isAdmin) {
    PRIVATE_CAMPAIGN_FIELDS.forEach((field) => {
      delete output[field];
    });
  }

  return output;
}

module.exports = { serializeCampaign };
