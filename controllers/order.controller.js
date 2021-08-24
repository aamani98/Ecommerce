const db = require("../models");

const addOrder = async (req, res) => {
  const { userId } = req;
  try {
    const order = await db.order.create({
      userId,
      status: "order-placed",
    });
    const productIds = req.body.products.map(({ productId }) => productId);
    const allproducts = await db.product.findAll({ where: { id: productIds } });
    await order.setProducts(allproducts);
    res.send({ message: "Order placed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
};

const allOrdersOfCustomer = async (req, res) => {
  const { userId } = req;
  try {
    const orders = await db.order.findAll({
      where: { userId },
      attributes: ["id", "status"],
      include: [
        {
          model: db.product,
          as: "products",
          attributes: ["id", "productName", "price"],
          include: [
            {
              model: db.user,
              attributes: ["id", "name", "email"],
              as: "owner",
            },
          ],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

const allOrdersOfOwners = async (req, res) => {
  const { userId } = req;
  const result = await db.order.findAll({
    attributes: ["id", "status"],
    include: [
      {
        model: db.user,
        as: "customer",
        attributes: ["id", "name", "email"],
      },
      {
        model: db.product,
        as: "products",
        where: { ownerId: userId },
        attributes: ["id", "productName", "price"],
        through: {
          attributes: ["productId", "orderId"],
        },
      },
    ],
  });
  res.json(result);
};

module.exports = {
  addOrder,
  allOrdersOfCustomer,
  allOrdersOfOwners,
};
