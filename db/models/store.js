'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Inventory }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' })
      this.hasMany(Inventory, { foreignKey: 'storeId' })
    }
  };
  Store.init({
    name: {
      type: DataTypes.STRING,
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
    modelName: 'Store',
    tableName: 'stores'
  });
  return Store;
};