const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ArticleModel = require("../model/article");
const authMiddleware = require("../middleware/authMiddleware");

// upload directory
const uploadDir = path.join(__dirname, "..", "upload", "article");

// Pastikan folder tersedia
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP."));
    }
    cb(null, true);
  },
});

// ===========================================================================
// routes public
router.get("/public", async (req, res) => {
  try {
    const article = await ArticleModel.findAll({
      where: {
        status: "Published",
      },
      order: [["tanggal", "DESC"]],
    });

    res.status(200).json({
      data: article,
    });
  } catch (error) {
    console.error("GET PUBLIC ARTICLE ERROR:", error);

    res.status(500).json({
      message: "Gagal mengambil artikel",
    });
  }
});

// routes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      data: articles,
    });
  } catch (error) {
    console.error("GET ARTICLE ERROR:", error);

    res.status(500).json({
      message: "Gagal mengambil data article",
    });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article tidak ditemukan",
      });
    }

    res.status(200).json({
      data: article,
    });
  } catch (error) {
    console.error("GET ARTICLE BY ID ERROR:", error);

    res.status(500).json({
      message: "Gagal mengambil article",
    });
  }
});

router.post("/", authMiddleware, upload.single("gambar"), async (req, res) => {
  try {
    const { judul, kategori, excerpt, isi, penulis, tanggal, status } =
      req.body;
    if (!judul || !judul.trim()) {
      return res.status(400).json({
        message: "Judul artikel wajib diisi",
      });
    }
    if (!isi || !isi.trim()) {
      return res.status(400).json({
        message: "Isi artikel wajib diisi",
      });
    }
    let gambar = null;
    if (req.file) {
      gambar = `/upload/article/${req.file.filename}`;
    }
    const article = await ArticleModel.create({
      judul,
      kategori: kategori || "Legal Update",
      excerpt: excerpt || null,
      isi,
      penulis: penulis || null,
      tanggal: tanggal || null,
      status: status || "Draft",
      gambar,
    });

    res.status(201).json({
      data: article,
      message: "Article berhasil ditambahkan",
    });
  } catch (error) {
    console.error("CREATE ARTICLE ERROR:", error);
    if (req.file) {
      const filePath = path.join(uploadDir, req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({
      message: error.message || "Gagal menambahkan article",
    });
  }
});

router.put(
  "/:id",
  authMiddleware,
  upload.single("gambar"),
  async (req, res) => {
    try {
      const article = await ArticleModel.findByPk(req.params.id);

      if (!article) {
        return res.status(404).json({
          message: "Article tidak ditemukan",
        });
      }

      const { judul, kategori, excerpt, isi, penulis, tanggal, status } =
        req.body;
      const oldImage = article.gambar;
      let gambar = oldImage;
      if (req.file) {
        gambar = `/upload/article/${req.file.filename}`;
        if (oldImage) {
          try {
            const oldFileName = path.basename(oldImage);
            const oldImagePath = path.join(uploadDir, oldFileName);
            console.log("Gambar lama:", oldImage);
            console.log("Path gambar lama:", oldImagePath);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
              console.log("Gambar lama berhasil dihapus");
            } else {
              console.log("Gambar lama tidak ditemukan");
            }
          } catch (deleteError) {
            console.error("Gagal menghapus gambar lama:", deleteError);
          }
        }
      }
      await article.update({ judul, kategori, excerpt, isi, penulis, tanggal: tanggal || null, status, gambar,});
      res.status(200).json({
        data: article,
        message: "Article berhasil diperbarui",
      });
    } catch (error) {
      console.error("UPDATE ARTICLE ERROR:", error);
      res.status(500).json({
        message: error.message || "Gagal memperbarui article",
      });
    }
  },
);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Article tidak ditemukan",
      });
    }
    if (article.gambar) {
      try {
        const fileName = path.basename(article.gambar);
        const imagePath = path.join(uploadDir, fileName);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log("Gambar article berhasil dihapus:", imagePath);
        }
      } catch (deleteError) {
        console.error("Gagal menghapus gambar article:", deleteError);
      }
    }
    await article.destroy();
    res.status(200).json({
      message: "Article berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE ARTICLE ERROR:", error);
    res.status(500).json({
      message: error.message || "Gagal menghapus article",
    });
  }
});

module.exports = router;
