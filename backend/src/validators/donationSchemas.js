const { z } = require("zod");

const initiateDonationSchema = z.object({
  body: z.object({
    campaignId: z.string().uuid(),
    amount: z.coerce.number().positive()
  })
});

const cryptoLogSchema = z.object({
  body: z.object({
    campaignId: z.string().uuid(),
    txHash: z.string().min(10),
    chain: z.string().min(2),
    amount: z.coerce.number().positive()
  })
});

module.exports = { cryptoLogSchema, initiateDonationSchema };
