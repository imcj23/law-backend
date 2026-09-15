// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

// router.get(
//   "/admin-test",
//   authMiddleware,
//   roleMiddleware("admin"),
//   (req, res) => {
//     res.status(200).json({
//       message: "Anda memiliki akses admin",
//       user: req.user,
//     });
//   }
// );

// module.exports = router;