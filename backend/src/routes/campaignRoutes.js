const { Router } = require("express");
const multer = require("multer");
const controller = require("../controllers/campaignController");
const { requireAuth, requireRole } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const {
  createCampaignSchema,
  updateCampaignSchema,
  updateSchema
} = require("../validators/campaignSchemas");

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", asyncHandler(controller.listCampaigns));
router.get("/my/campaigns", requireAuth, requireRole("CAMPAIGNER"), asyncHandler(controller.myCampaigns));
router.get("/:id", asyncHandler(controller.getCampaign));
router.post("/", requireAuth, requireRole("CAMPAIGNER"), validate(createCampaignSchema), asyncHandler(controller.createCampaign));
router.patch("/:id", requireAuth, requireRole("CAMPAIGNER"), validate(updateCampaignSchema), asyncHandler(controller.updateCampaign));
router.post("/:id/submit", requireAuth, requireRole("CAMPAIGNER"), asyncHandler(controller.submitCampaign));
router.post("/:id/media", requireAuth, requireRole("CAMPAIGNER"), upload.array("files"), asyncHandler(controller.uploadMedia));
router.post("/:id/updates", requireAuth, requireRole("CAMPAIGNER"), validate(updateSchema), asyncHandler(controller.createUpdate));
router.get("/:id/updates", asyncHandler(controller.listUpdates));

module.exports = router;
