const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UsersModel = require("../model/user");
const bcrypt = require("bcrypt");
const passwordCheck = require("../utils/passwordCheck");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token tidak valid atau sudah expired" });
  }
};
router.get("/", async (req, res) => {
  try {
    const users = await UsersModel.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ data: users, metadata: "users data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data user" });
  }
});
router.post("/register", async (req, res) => {
  try {
    const { email, nama, password, role } = req.body;
    if (!email || !nama || !password) {
      return res
        .status(400)
        .json({ message: "Nama, email, dan password wajib diisi" });
    }
    const existingUser = await UsersModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({
      email,
      nama,
      role,
      password: encryptedPassword,
    });
    const userResponse = user.toJSON();
    delete userResponse.password;
    res
      .status(200)
      .json({ data: userResponse, metadata: "user berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal melakukan register" });
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
        { expiresIn: "1d" },
      );
      res
        .status(200)
        .json({ message: "Login success", token: token, user: check.userData });
    } else {
      res.status(400).json({ error: "Email atau password salah" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
});
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password } = req.body;
    if (String(req.user.id) !== String(id)) {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki izin untuk mengubah akun ini" });
    }
    if (!nama || !nama.trim()) {
      return res.status(400).json({ message: "Nama tidak boleh kosong" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email tidak boleh kosong" });
    }
    const user = await UsersModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const existingUser = await UsersModel.findOne({
      where: { email: email.trim() },
    });
    if (existingUser && String(existingUser.id) !== String(id)) {
      return res
        .status(400)
        .json({ message: "Email sudah digunakan oleh user lain" });
    }
    const updateData = { nama: nama.trim(), email: email.trim() };
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password minimal 6 karakter" });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }
    await user.update(updateData);
    const updatedUser = await UsersModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        email: updatedUser.email,
        nama: updatedUser.nama,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res
      .status(200)
      .json({
        message: "Akun berhasil diperbarui",
        user: updatedUser,
        token: newToken,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui akun" });
  }
});
module.exports = router;
