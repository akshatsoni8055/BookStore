'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Store, Book }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' })
      this.belongsTo(Store, { foreignKey: 'storeId' })
      this.hasMany(Book, { foreignKey: 'inventoryId' })
    }
  };
  Inventory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'stores',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventories'
  });
  return Inventory;
};