const router = require("express").Router();
const {
  verifyToken,
  isCustomer,
  isOwner,
  orderInputValidation,
} = require("../middlewares");
const {
  addOrder,
  allOrdersOfOwners,
  allOrdersOfCustomer,
} = require("../controllers/order.controller");

router.post("/", [verifyToken, isCustomer, orderInputValidation], addOrder);
router.get("/customer", [verifyToken, isCustomer], allOrdersOfCustomer);
router.get("/owner", [verifyToken, isOwner], allOrdersOfOwners);

module.exports = router;
