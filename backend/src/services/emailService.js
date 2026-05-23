async function sendVerificationEmail(user, token) {
  console.log(`Verification email queued for ${user.email}: ${token}`);
}

async function sendPasswordResetEmail(user, token) {
  console.log(`Password reset email queued for ${user.email}: ${token}`);
}

async function notifyAdminsOfCampaign(campaign) {
  console.log(`Admin notification queued for campaign ${campaign.id}`);
}

async function sendCampaignRejectedEmail(campaign) {
  console.log(`Rejection email queued for campaign ${campaign.id}`);
}

module.exports = {
  notifyAdminsOfCampaign,
  sendCampaignRejectedEmail,
  sendPasswordResetEmail,
  sendVerificationEmail
};
