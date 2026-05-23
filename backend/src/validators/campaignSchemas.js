const { z } = require("zod");

const campaignBody = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  healthCondition: z.string().min(2),
  healthConditionOther: z.string().optional(),
  targetAmount: z.coerce.number().positive(),
  targetDate: z.coerce.date().optional(),
  medicalFacility: z.string().min(2),
  hospitalWard: z.string().optional(),
  doctorName: z.string().min(2),
  doctorPhone: z.string().min(5),
  doctorEmail: z.string().email().optional().or(z.literal("")),
  patientFamilyName: z.string().min(2),
  patientFamilyPhone: z.string().min(5),
  patientFamilyRelation: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),
  walletAddress: z.string().optional()
});

const createCampaignSchema = z.object({ body: campaignBody });
const updateCampaignSchema = z.object({ body: campaignBody.partial() });

const updateSchema = z.object({
  body: z.object({
    content: z.string().min(2)
  })
});

module.exports = { createCampaignSchema, updateCampaignSchema, updateSchema };
