module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    userId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return Order;
};
