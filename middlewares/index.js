const {
  registerUserInputValidation,
  loginUserInputValidation,
} = require("./authInputValidation");
const userExists = require("./authSignupDuplicate");
const verifyToken = require("./verifyToken");
const { isOwner, isCustomer } = require("./validateRoles");
const productInputValidation = require("./productInputValidation");
const orderInputValidation = require("./orderInputValidation");

module.exports = {
  registerUserInputValidation,
  loginUserInputValidation,
  userExists,
  verifyToken,
  isOwner,
  isCustomer,
  productInputValidation,
  orderInputValidation,
};
