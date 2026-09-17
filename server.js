// require("dotenv").config();
// const cors = require("cors");
// const express = require("express");
// const port = 3500;
// const app = express();
// const path = require('path')

// const sequelize = require("./db.config");
// sequelize.sync().then(() => console.log("database terkoneksi"));

// // middleware
// app.use(cors());
// app.use(express.json());

// const usersEndpoint = require('./routes/user')
// const advocateEndpoint = require('./routes/advocate')
// const practiceEndpoint =  require('./routes/practice')
// const articleEndpoint =  require('./routes/article')
// // const testRoutes = require("./routes/testRoutes");

// app.use('/',usersEndpoint)
// app.use('/advocate',advocateEndpoint)
// app.use('/practice',practiceEndpoint)
// app.use('/article',articleEndpoint)
// app.use(
//   "/upload/advocate",
//   express.static(path.join(__dirname,"upload/advocate"))
// );
// app.use(
//   "/upload/article",
//   express.static(
//     path.join(__dirname, "upload", "article")
//   )
// );
// // app.use("/api/test", testRoutes);

// const PORT = process.env.PORT || 3500;
// app.listen(port, () => console.log(`server berjalan di port ${port}`));

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const path = require("path");
const sequelize = require("./db.config");

const usersEndpoint = require("./routes/user");
const advocateEndpoint = require("./routes/advocate");
const practiceEndpoint = require("./routes/practice");
const articleEndpoint = require("./routes/article");

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.use("/", usersEndpoint);
app.use("/advocate", advocateEndpoint);
app.use("/practice", practiceEndpoint);
app.use("/article", articleEndpoint);

app.use(
  "/upload/advocate",
  express.static(path.join(__dirname, "upload", "advocate")),
);

app.use(
  "/upload/article",
  express.static(path.join(__dirname, "upload", "article")),
);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "DSPLawyer backend is running",
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database berhasil terhubung ke TiDB!");

    return sequelize.sync();
  })
  .then(() => {
    console.log("Database berhasil disinkronisasi!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database gagal terkoneksi:");
    console.error(err);
  });

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_PORT:", process.env.DB_PORT);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_USER:", process.env.DB_USER);
