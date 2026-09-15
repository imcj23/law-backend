const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UsersModel = require("../model/user");
const bcrypt = require("bcrypt");
const passwordCheck = require("../utils/passwordCheck");

router.get("/", async (req, res) => {
  try {
    const users = await UsersModel.findAll();

    res.status(200).json({
      data: users,
      metadata: "users data",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Gagal mengambil data user",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, nama, password, role } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({
      email,
      nama,
      role,
      password: encryptedPassword,
    });

    res.status(200).json({
      data: user,
      metadata: "user berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Gagal melakukan register",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const check = await passwordCheck(email, password);
    if (check.compare === true) {
      const token = jwt.sign(
        {
          id: check.userData.id,
          email: check.userData.email,
          nama: check.userData.nama,
          role: check.userData.role,
        },  
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );
      res.status(200).json({
        message: "Login success",
        token: token,
        user: check.userData,
      });
    } else {
      res.status(400).json({
        error: "Email atau password salah",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat login",
    });
  }
});

module.exports = router;
