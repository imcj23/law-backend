// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const AdvocateModel = require("../model/advocate");

// const uploadDir = path.join(__dirname, "../upload/advocate");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // konfigurasi multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   },
// });

// // file
// const fileFilter = (req, file, cb) => {
//   const allowedExtensions = /jpeg|jpg|png|webp/;
//   const extname = allowedExtensions.test(
//     path.extname(file.originalname).toLowerCase(),
//   );
//   const mimetype = allowedExtensions.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP"), false);
//   }
// };

// // multer
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
// });

// // helper parser json
// const parseJSON = (value, defaultValue = null) => {
//   if (value === undefined || value === null || value === "") {
//     return defaultValue;
//   }
//   if (typeof value === "object") {
//     return value;
//   }
//   try {
//     return JSON.parse(value);
//   } catch (error) {
//     console.error("JSON PARSE ERROR:", error);
//     return defaultValue;
//   }
// };

// // route
// router.get("/", async (req, res) => {
//   try {
//     const advocates = await AdvocateModel.findAll({
//       order: [["id", "ASC"]],
//     });
//     res.status(200).json({
//       data: advocates,
//       message: "Data advokat berhasil diambil",
//     });
//   } catch (error) {
//     console.error("GET ADVOCATES ERROR:", error);
//     res.status(500).json({
//       message: "Gagal mengambil data advokat",
//     });
//   }
// });

// router.get("/public/active", async (req, res) => {
//   try {
//     const advocates = await AdvocateModel.findAll({
//       where: {
//         status: "active",
//       },
//       order: [["id", "ASC"]],
//     });
//     res.status(200).json({
//       data: advocates,
//       message: "Data advokat aktif berhasil diambil",
//     });
//   } catch (error) {
//     console.error("GET ACTIVE ADVOCATES ERROR:", error);
//     res.status(500).json({
//       message: "Gagal mengambil data advokat aktif",
//     });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const advocate = await AdvocateModel.findByPk(req.params.id);
//     if (!advocate) {
//       return res.status(404).json({
//         message: "Data advokat tidak ditemukan",
//       });
//     }
//     res.status(200).json({
//       data: advocate,
//       message: "Data advokat berhasil diambil",
//     });
//   } catch (error) {
//     console.error("GET ADVOCATE BY ID ERROR:", error);
//     res.status(500).json({
//       message: "Gagal mengambil data advokat",
//     });
//   }
// });

// router.post("/", upload.single("foto"), async (req, res) => {
//   try {
//     const {
//       nama,
//       posisi,
//       email_1,
//       email_office,
//       no_hp,
//       tagline,
//       bio,
//       practice_focus,
//       education,
//       experience,
//       admission,
//       membership,
//       languages,
//       selected_experience,
//       status,
//     } = req.body;
//     if (!nama || !posisi || !email_1 || !no_hp) {
//       return res.status(400).json({
//         message: "Nama, posisi, email utama, dan nomor HP wajib diisi",
//       });
//     }
//     let foto = null;
//     if (req.file) {
//       foto = `/upload/advocate/${req.file.filename}`;
//     }
//     const advocate = await AdvocateModel.create({
//       nama,
//       posisi,
//       email_1,
//       email_office: email_office || null,
//       no_hp,
//       foto,
//       tagline: tagline || null,
//       bio: bio || null,
//       practice_focus: parseJSON(practice_focus, []),
//       education: parseJSON(education, []),
//       experience: parseJSON(experience, []),
//       admission: parseJSON(admission, []),
//       membership: parseJSON(membership, []),
//       languages: parseJSON(languages, []),
//       selected_experience: parseJSON(selected_experience, []),
//       status: status || "active",
//     });
//     res.status(201).json({
//       data: advocate,
//       message: "Data advokat berhasil ditambahkan",
//     });
//   } catch (error) {
//     console.error("CREATE ADVOCATE ERROR:", error);
//     if (req.file) {
//       const uploadedPhoto = path.join(uploadDir, req.file.filename);
//       if (fs.existsSync(uploadedPhoto)) {
//         fs.unlinkSync(uploadedPhoto);
//       }
//     }
//     res.status(500).json({
//       message: error.message || "Gagal menambahkan data advokat",
//     });
//   }
// });

// router.put("/:id", upload.single("foto"), async (req, res) => {
//   try {
//     const advocate = await AdvocateModel.findByPk(req.params.id);
//     if (!advocate) {
//       return res.status(404).json({
//         message: "Data advokat tidak ditemukan",
//       });
//     }
//     const {
//       nama,
//       posisi,
//       email_1,
//       email_office,
//       no_hp,
//       tagline,
//       bio,
//       practice_focus,
//       education,
//       experience,
//       admission,
//       membership,
//       languages,
//       selected_experience,
//       status,
//     } = req.body;
//     const oldPhoto = advocate.foto;
//     let foto = oldPhoto;
//     if (req.file) {
//       foto = `/upload/advocate/${req.file.filename}`;
//       if (oldPhoto) {
//         try {
//           const oldFileName = path.basename(oldPhoto);

//           const oldPhotoPath = path.join(uploadDir, oldFileName);
//           if (fs.existsSync(oldPhotoPath)) {
//             fs.unlinkSync(oldPhotoPath);
//             console.log("Foto lama berhasil dihapus:", oldPhotoPath);
//           }
//         } catch (deleteError) {
//           console.error("Gagal menghapus foto lama:", deleteError);
//         }
//       }
//     }
//     await advocate.update({
//       nama,
//       posisi,
//       email_1,
//       email_office: email_office || null,
//       no_hp,
//       foto,
//       tagline: tagline || null,
//       bio: bio || null,
//       practice_focus: parseJSON(practice_focus, advocate.practice_focus || []),
//       education: parseJSON(education, advocate.education || []),
//       experience: parseJSON(experience, advocate.experience || []),
//       admission: parseJSON(admission, advocate.admission || []),
//       membership: parseJSON(membership, advocate.membership || []),
//       languages: parseJSON(languages, advocate.languages || []),
//       selected_experience: parseJSON(
//         selected_experience,
//         advocate.selected_experience || [],
//       ),
//       status: status || advocate.status || "active",
//     });
//     res.status(200).json({
//       data: advocate,
//       message: "Data advokat berhasil diperbarui",
//     });
//   } catch (error) {
//     console.error("UPDATE ADVOCATE ERROR:", error);
//     if (req.file) {
//       const newPhotoPath = path.join(uploadDir, req.file.filename);

//       if (fs.existsSync(newPhotoPath)) {
//         fs.unlinkSync(newPhotoPath);
//       }
//     }
//     res.status(500).json({
//       message: error.message || "Gagal memperbarui data advokat",
//     });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const advocate = await AdvocateModel.findByPk(req.params.id);
//     if (!advocate) {
//       return res.status(404).json({
//         message: "Data advokat tidak ditemukan",
//       });
//     }
//     if (advocate.foto) {
//       const fileName = path.basename(advocate.foto);
//       const photoPath = path.join(uploadDir, fileName);
//       if (fs.existsSync(photoPath)) {
//         fs.unlinkSync(photoPath);
//         console.log("Foto advokat berhasil dihapus:", photoPath);
//       }
//     }
//     await advocate.destroy();
//     res.status(200).json({
//       message: "Data advokat berhasil dihapus",
//     });
//   } catch (error) {
//     console.error("DELETE ADVOCATE ERROR:", error);
//     res.status(500).json({
//       message: "Gagal menghapus data advokat",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AdvocateModel = require("../model/advocate");

const uploadDir = path.join(__dirname, "../upload/advocate");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// penyimpanan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// filter file gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP"), false);
  }
};

// multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

// helper parse json
const parseJSON = (value, defaultValue = []) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  if (typeof value === "object") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("JSON PARSE ERROR:", error);
    return defaultValue;
  }
};

// router
router.get("/", async (req, res) => {
  try {
    const advocate = await AdvocateModel.findOne({
      order: [["id", "ASC"]],
    });

    if (!advocate) {
      return res.status(404).json({
        message: "Data advocate belum tersedia",
      });
    }
    res.status(200).json({
      data: advocate,
      message: "Data advocate berhasil diambil",
    });
  } catch (error) {
    console.error("GET ADVOCATE ERROR:", error);
    res.status(500).json({
      message: "Gagal mengambil data advocate",
    });
  }
});

router.post("/", upload.single("foto"), async (req, res) => {
  try {
    const existingAdvocate = await AdvocateModel.findOne();
    if (existingAdvocate) {
      if (req.file) {
        const uploadedPhoto = path.join(uploadDir, req.file.filename);
        if (fs.existsSync(uploadedPhoto)) {
          fs.unlinkSync(uploadedPhoto);
        }
      }
      return res.status(409).json({
        message:
          "Profil advocate sudah tersedia. Gunakan PUT /advocate untuk memperbarui data.",
      });
    }
    const {
      nama,
      posisi,
      email_1,
      email_office,
      no_hp,
      tagline,
      bio,
      practice_focus,
      education,
      experience,
      admission,
      membership,
      languages,
      selected_experience,
      status,
    } = req.body;
    if (!nama) {
      return res.status(400).json({
        message: "Nama advocate wajib diisi",
      });
    }
    if (!posisi) {
      return res.status(400).json({
        message: "Posisi advocate wajib diisi",
      });
    }
    if (!email_1) {
      return res.status(400).json({
        message: "Email advocate wajib diisi",
      });
    }
    if (!no_hp) {
      return res.status(400).json({
        message: "Nomor HP advocate wajib diisi",
      });
    }
    let foto = null;
    if (req.file) {
      foto = `/upload/advocate/${req.file.filename}`;
    }
    const advocate = await AdvocateModel.create({
      nama,
      posisi,
      email_1,
      email_office: email_office || null,
      no_hp,
      foto,
      tagline: tagline || null,
      bio: bio || null,
      practice_focus: parseJSON(practice_focus, []),
      education: parseJSON(education, []),
      experience: parseJSON(experience, []),
      admission: parseJSON(admission, []),
      membership: parseJSON(membership, []),
      languages: parseJSON(languages, []),
      selected_experience: parseJSON(selected_experience, []),
      status: status || "active",
    });
    res.status(201).json({
      data: advocate,
      message: "Profil advocate berhasil dibuat",
    });
  } catch (error) {
    console.error("CREATE ADVOCATE ERROR:", error);
    if (req.file) {
      const uploadedPhoto = path.join(uploadDir, req.file.filename);
      if (fs.existsSync(uploadedPhoto)) {
        fs.unlinkSync(uploadedPhoto);
      }
    }
    res.status(500).json({
      message: error.message || "Gagal membuat profil advocate",
    });
  }
});

router.put("/", upload.single("foto"), async (req, res) => {
  try {
    const advocate = await AdvocateModel.findOne({
      order: [["id", "ASC"]],
    });
    if (!advocate) {
      if (req.file) {
        const uploadedPhoto = path.join(uploadDir, req.file.filename);
        if (fs.existsSync(uploadedPhoto)) {
          fs.unlinkSync(uploadedPhoto);
        }
      }
      return res.status(404).json({
        message:
          "Profil advocate belum tersedia. Silakan buat profil terlebih dahulu.",
      });
    }
    const {
      nama,
      posisi,
      email_1,
      email_office,
      no_hp,
      tagline,
      bio,
      practice_focus,
      education,
      experience,
      admission,
      membership,
      languages,
      selected_experience,
      status,
    } = req.body;
    const oldPhoto = advocate.foto;
    let foto = oldPhoto;
    if (req.file) {
      foto = `/upload/advocate/${req.file.filename}`;
      if (oldPhoto) {
        try {
          const oldFileName = path.basename(oldPhoto);
          const oldPhotoPath = path.join(uploadDir, oldFileName);
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath);
            console.log("Foto lama berhasil dihapus:", oldPhotoPath);
          }
        } catch (deleteError) {
          console.error("Gagal menghapus foto lama:", deleteError);
        }
      }
    }
    await advocate.update({
      nama,
      posisi,
      email_1,
      email_office: email_office || null,
      no_hp,
      foto,
      tagline: tagline || null,
      bio: bio || null,
      practice_focus: parseJSON(practice_focus, advocate.practice_focus || []),
      education: parseJSON(education, advocate.education || []),
      experience: parseJSON(experience, advocate.experience || []),
      admission: parseJSON(admission, advocate.admission || []),
      membership: parseJSON(membership, advocate.membership || []),
      languages: parseJSON(languages, advocate.languages || []),
      selected_experience: parseJSON(
        selected_experience,
        advocate.selected_experience || [],
      ),
      status: status || advocate.status || "active",
    });
    res.status(200).json({
      data: advocate,
      message: "Profil advocate berhasil diperbarui",
    });
  } catch (error) {
    console.error("UPDATE ADVOCATE ERROR:", error);
    if (req.file) {
      const newPhotoPath = path.join(uploadDir, req.file.filename);
      if (fs.existsSync(newPhotoPath)) {
        fs.unlinkSync(newPhotoPath);
      }
    }
    res.status(500).json({
      message: error.message || "Gagal memperbarui profil advocate",
    });
  }
});

module.exports = router;
