'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Product, {
        foreignKey: 'ProductId'
      })

      OrderItem.belongsTo(models.Profile, {
        foreignKey: 'UserProfileId'
      })
    }
  }
  OrderItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};