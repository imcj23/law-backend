const express = require("express");
const router = express.Router();
const PracticeModel = require("../model/practice");

router.get("/", async (req, res) => {
  try {
    const practices = await PracticeModel.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json({
      data: practices,
      message: "Data practice berhasil diambil",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data practice",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const practice = await PracticeModel.findByPk(req.params.id);
    if (!practice) {
      return res.status(404).json({
        message: "Practice tidak ditemukan",
      });
    }
    res.status(200).json({
      data: practice,
      message: "Data practice berhasil diambil",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data practice",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      nama,
      deskripsi,
      icon,
      yang_kami_lakukan,
      pendekatan_kami,
      masalah_umum,
    } = req.body;
    const practice = await PracticeModel.create({
      nama,
      deskripsi,
      icon,
      yang_kami_lakukan,
      pendekatan_kami,
      masalah_umum,
    });
    res.status(201).json({
      data: practice,
      message: "Practice berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menambahkan practice",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const practice = await PracticeModel.findByPk(req.params.id);
    if (!practice) {
      return res.status(404).json({
        message: "Practice tidak ditemukan",
      });
    }
    const {
      nama,
      deskripsi,
      icon,
      yang_kami_lakukan,
      pendekatan_kami,
      masalah_umum,
    } = req.body;
    await practice.update({
      nama,
      deskripsi,
      icon,
      yang_kami_lakukan,
      pendekatan_kami,
      masalah_umum,
    });
    res.status(200).json({
      data: practice,
      message: "Practice berhasil diperbarui",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal memperbarui practice",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const practice = await PracticeModel.findByPk(req.params.id);
    if (!practice) {
      return res.status(404).json({
        message: "Practice tidak ditemukan",
      });
    }
    await practice.destroy();
    res.status(200).json({
      message: "Practice berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus practice",
    });
  }
});

module.exports = router;