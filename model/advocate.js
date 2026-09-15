const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

class Advocate extends Model {}

Advocate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nama: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    posisi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email_1: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    email_office: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    no_hp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    foto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    tagline: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    practice_focus: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    education: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    experience: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    admission: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    membership: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    languages: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    selected_experience: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Advocate",
    tableName: "Advocates",
  }
);

module.exports = Advocate;