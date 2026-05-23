const { Router } = require("express");
const controller = require("../controllers/authController");
const { asyncHandler } = require("../utils/asyncHandler");
const { validate } = require("../middleware/validate");
const {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema
} = require("../validators/authSchemas");

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(controller.register));
router.post("/login", validate(loginSchema), asyncHandler(controller.login));
router.post("/refresh", validate(refreshSchema), asyncHandler(controller.refresh));
router.post("/logout", validate(refreshSchema), asyncHandler(controller.logout));
router.get("/verify-email/:token", asyncHandler(controller.verifyEmail));
router.post("/forgot-password", validate(forgotPasswordSchema), asyncHandler(controller.forgotPassword));
router.post("/reset-password", validate(resetPasswordSchema), asyncHandler(controller.resetPassword));

module.exports = router;
