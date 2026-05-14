"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Residence extends Model {
    static associate(models) {
      // Residence.belongsTo(models.Owner, {
      //   foreignKey: "owner_id",
      //   onDelete: "CASCADE",
      // });

      Residence.hasMany(models.ResidenceImage, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });

      Residence.hasMany(models.Rating, {
        foreignKey: "res_id",
        onDelete: "CASCADE",
      });
      

      Residence.hasMany(models.WishList,{
        foreignKey:"res_id",
        onDelete:"CASCADE"
      })



    }
  }

  Residence.init(
    {
      res_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      housing_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      available_for: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      floor_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      rent_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 1,
        },
      },

      building_num: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      distance_from_university: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      wifi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      parking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      security: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Residence",
      tableName: "Residence",
      timestamps: false,
    }
  );

  return Residence;
};