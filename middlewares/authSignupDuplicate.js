const db = require("../models");

const userExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await db.user.findOne({
    where: {
      email,
    },
  });

  if (user) {
    res.status(400).send("User already exists");
    return;
  }
  next();
};

module.exports = userExists;
