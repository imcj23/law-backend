const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.config");

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    judul: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    kategori: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Legal Update",
    },

    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isi: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    penulis: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    tanggal: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    gambar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("Draft", "Published"),
      allowNull: false,
      defaultValue: "Draft",
    },
  },
  {
    sequelize,
    modelName: "Article",
    tableName: "Articles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Article;