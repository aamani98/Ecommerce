const db = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await db.product.findAll({
      attributes: ["id", "productName", "price"],
      include: {
        model: db.user,
        as: "owner",
        attributes: ["id", "name", "email"],
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await db.product.findOne({
    attributes: ["id", "productName", "price"],
    where: { id: productId },
    include: {
      model: db.user,
      as: "owner",
      attributes: ["id", "name", "email"],
    },
  });
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.json(product);
};

const addProduct = async (req, res) => {
  const { productName, price } = req.body;
  try {
    await db.product.create({
      productName,
      price,
      ownerId: req.userId,
    });
    res.status(201).send({ message: "New Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
};
