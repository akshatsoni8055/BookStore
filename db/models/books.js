'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Inventory }) {
      // define association here
      this.belongsTo(Inventory, { foreignKey: 'inventoryId' })
      this.belongsTo(User, {foreignKey: 'userId'})
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'inventories', 
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
    modelName: 'Book',
    tableName: 'books'
  });
  return Book;
};