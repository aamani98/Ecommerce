const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/AuthConfig");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(400).send({ message: "Not Authenticated" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
