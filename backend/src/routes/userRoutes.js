const { Router } = require("express");
const controller = require("../controllers/userController");
const { requireAuth } = require("../middleware/auth");
const { asyncHandler } = require("../utils/asyncHandler");

const router = Router();

router.get("/me", requireAuth, asyncHandler(controller.me));
router.patch("/me", requireAuth, asyncHandler(controller.updateMe));
router.patch("/me/wallet", requireAuth, asyncHandler(controller.updateWallet));

module.exports = router;
