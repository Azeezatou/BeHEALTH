const { z } = require("zod");

const rejectCampaignSchema = z.object({
  body: z.object({
    notes: z.string().min(3)
  })
});

const changeRoleSchema = z.object({
  body: z.object({
    role: z.enum(["DONOR", "CAMPAIGNER", "ADMIN"])
  })
});

module.exports = { changeRoleSchema, rejectCampaignSchema };
