module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
    },
  });
  return Product;
};
