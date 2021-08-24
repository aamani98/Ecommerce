const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/AuthConfig");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Finding the role
    const rolefound = await db.role.findOne({
      where: {
        rolename: role,
      },
    });
    if (!rolefound) {
      return res.status(404).send({ message: `${role} is not allowed` });
    }

    // Saving User
    const user = await db.user.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    await user.setRoles(rolefound);

    // Return JWT
    const payload = {
      userId: user.get({ plain: true }).id,
    };
    jwt.sign(payload, JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token, message: "User Registered Sucessfully" });
    });
  } catch {
    res.status(500).send({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
    // Check for Password
    const isMatch = await bcrypt.compare(
      password,
      user.get({ plain: true }).password
    );
    if (!isMatch)
      return res.status(400).send({ message: "Invalid Credentials" });

    // Return JWT
    const payload = {
      userId: user.get({ plain: true }).id,
    };
    jwt.sign(payload, JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token, message: "User LoggedIn Sucessfully" });
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
