const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth.contoller");
const {
  loginUserInputValidation,
  registerUserInputValidation,
  userExists,
} = require("../middlewares");

router.post(
  "/register",
  [registerUserInputValidation, userExists],
  registerUser
);
router.post("/login", loginUserInputValidation, loginUser);

module.exports = router;
