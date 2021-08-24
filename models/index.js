const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/dbConfig");

const sequelize = new Sequelize(
  config.DB_DATABASE,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: "mysql",
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.role = require("./role")(sequelize, DataTypes);
db.user = require("./user")(sequelize, DataTypes);
db.product = require("./product")(sequelize, DataTypes);
db.order = require("./order")(sequelize, DataTypes);

db.role.hasMany(db.user, {
  foreignKey: "role",
  as: "users",
});

db.user.belongsTo(db.role, {
  foreignKey: "role",
  as: "roles",
});

db.user.hasMany(db.product, {
  foreignKey: "ownerId",
  as: "products",
});

db.product.belongsTo(db.user, {
  foreignKey: "ownerId",
  as: "owner",
});

db.product.belongsToMany(db.order, {
  through: "orderproducts",
  foreignKey: "productId",
  otherKey: "orderId",
  as: "orders",
});

db.order.belongsToMany(db.product, {
  through: "orderproducts",
  foreignKey: "orderId",
  otherKey: "productId",
  as: "products",
});

db.user.hasMany(db.order, {
  foreignKey: "userId",
  as: "orders",
});

db.order.belongsTo(db.user, {
  foreignKey: "userId",
  as: "customer",
});

(async () => {
  await db.sequelize.sync({ force: true });
  db.role.bulkCreate([{ rolename: "owner" }, { rolename: "customer" }]);
})();

module.exports = db;
