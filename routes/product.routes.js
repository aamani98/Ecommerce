const router = require("express").Router();
const {
  getAllProducts,
  addProduct,
  getProductById,
} = require("../controllers/product.controller");
const {
  verifyToken,
  isOwner,
  isCustomer,
  productInputValidation,
} = require("../middlewares");

router.post("/", [verifyToken, isOwner, productInputValidation], addProduct);
router.get("/", [verifyToken, isCustomer], getAllProducts);
router.get("/:productId", [verifyToken, isCustomer], getProductById);

module.exports = router;
