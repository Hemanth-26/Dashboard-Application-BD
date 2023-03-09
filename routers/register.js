const RegisterRouter = require("express").Router();
const {
  RegisterUser,
  VerifyOtp,
  ResendOtp,
  ForgotPassword,
  ConfirmPassword,
} = require("../controllers/register");

RegisterRouter.post("/", RegisterUser);

RegisterRouter.post("/verify_otp", VerifyOtp);

RegisterRouter.post("/resend_otp", ResendOtp);

RegisterRouter.post("/forget_password", ForgotPassword);

RegisterRouter.post("/confirm_password", ConfirmPassword);

module.exports = RegisterRouter;
