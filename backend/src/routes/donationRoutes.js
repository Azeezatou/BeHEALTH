const { Router } = require("express");
const controller = require("../controllers/donationController");
const { requireAuth, requireRole } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { cryptoLogSchema, initiateDonationSchema } = require("../validators/donationSchemas");

const router = Router();

router.post("/initiate", requireAuth, requireRole("DONOR"), validate(initiateDonationSchema), asyncHandler(controller.initiate));
router.get("/verify/:reference", asyncHandler(controller.verify));
router.post("/crypto/log", requireAuth, requireRole("DONOR"), validate(cryptoLogSchema), asyncHandler(controller.logCrypto));
router.get("/my", requireAuth, requireRole("DONOR"), asyncHandler(controller.myDonations));

module.exports = router;
