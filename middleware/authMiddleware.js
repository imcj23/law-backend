const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Token tidak ditemukan",
      });
    }
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Format token harus Bearer <token>",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token tidak valid",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.name, error.message);
    return res.status(401).json({
      message: "Token tidak valid atau sudah expired",
    });
  }
};

module.exports = authMiddleware;
