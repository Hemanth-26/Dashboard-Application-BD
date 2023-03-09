const jwt = require("jsonwebtoken");
const User = require("../models/register.model");

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "No headers provided",
    });
  }

  //Get the token from the authorization bearer
  const token = authorization.replace("Bearer ", "");

  //Verifying the user token for accessing the protected pages
  try {
    let payload = await jwt.verify(token, secret);
    //Payload given at the time of signing in
    const { _id } = payload;
    let user = await User.findById({ _id });
    if (!user || user.userType > 0){
        return res.status(401).json({ message: "You logged as unauthorized user" });
        
    }

    // req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "You must be logged in" });
  }
};
