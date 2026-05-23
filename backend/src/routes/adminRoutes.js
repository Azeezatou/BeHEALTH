const { Router } = require("express");
const controller = require("../controllers/adminController");
const { requireAuth, requireRole } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../utils/asyncHandler");
const { changeRoleSchema, rejectCampaignSchema } = require("../validators/adminSchemas");

const router = Router();

router.use(requireAuth, requireRole("ADMIN"));
router.get("/campaigns", asyncHandler(controller.listCampaigns));
router.get("/campaigns/:id", asyncHandler(controller.getCampaign));
router.post("/campaigns/:id/approve", asyncHandler(controller.approveCampaign));
router.post("/campaigns/:id/reject", validate(rejectCampaignSchema), asyncHandler(controller.rejectCampaign));
router.get("/users", asyncHandler(controller.listUsers));
router.patch("/users/:id/role", validate(changeRoleSchema), asyncHandler(controller.changeUserRole));

module.exports = router;
