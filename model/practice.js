const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

class Practice extends Model {}
Practice.init(
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

    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    yang_kami_lakukan: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    pendekatan_kami: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    masalah_umum: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Practice",
  },
)

module.exports = Practice