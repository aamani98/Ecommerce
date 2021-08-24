module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    rolename: {
      type: DataTypes.STRING,
    },
  });

  return Role;
};
