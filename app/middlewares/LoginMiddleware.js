const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  console.log(req.headers.authorization);
  if (token) {
    try {
      const verified = jwt.verify(token, config.tokenKey);
      console.log(verified);
      next();
    } catch {
      res.status(400).json({
        message: "Verification failure.",
        err: "verFail",
      });
    }
  } else {
    res.status(400).json({
      message: "No user is logged in.",
      err: "noLogged",
    });
  }
};
