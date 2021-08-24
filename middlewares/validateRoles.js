const db = require("../models");

const findUserWithRole = async (userId, role, res) => {
  try {
    const user = await db.user.findOne({
      where: {
        id: userId,
      },
      include: {
        model: db.role,
        as: "roles",
      },
    });
    if (!user) {
      res.status(400).send({ message: "Not a user" });
      return false;
    }
    if (user.roles.dataValues.rolename != role) {
      res.status(403).send({ message: "User is not allowed this action" });
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const isOwner = async (req, res, next) => {
  const { userId } = req;
  try {
    if (await findUserWithRole(userId, "owner", res)) {
      next();
    } else {
      return;
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

const isCustomer = async (req, res, next) => {
  const { userId } = req;
  try {
    if (await findUserWithRole(userId, "customer", res)) {
      next();
    } else {
      return;
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  isOwner,
  isCustomer,
};
