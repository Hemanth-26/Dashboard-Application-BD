const LoginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/register.model");
const errorMessages = require("../utils/validationErrMsg");
const { comparePassword } = require("../utils/hash");
const requireLogin = require("../middleware/requireLogin");

const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRES_IN;

LoginRouter.post("/", async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "email not registered" });
    else if (!user.validUser)
      return res.status(400).json({ message: "user is not registered" });
    const passwordValid = await comparePassword(password, user.password);
    if (!passwordValid)
      return res.status(400).json({ message: "password incorrect" });

    const token = await jwt.sign({ _id: user._id }, secret, {
      expiresIn: expires,
    });

    // console.log(token);
    let userRole;
    switch (user.userType) {
      case 0:
        userRole = "user";
        break;
      case 1:
        userRole = "admin";
        break;
      case 2:
        userRole = "super_admin";
        break;
      default:
        userRole = "user";
        break;
    }
    res.status(200).json({
      message: "Successfully logined",
      user_id: user._id,
      role: userRole,
      access_token: token,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: errorMessages(error) });
  }
});

LoginRouter.get("/", requireLogin, async (req, res) => {
  res.send("Hello, world!");
});

module.exports = LoginRouter;
