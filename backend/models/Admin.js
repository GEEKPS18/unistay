'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }

  Admin.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'all',
      },
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'Admins',
      timestamps: false,
    },
  );

  return Admin;
};
