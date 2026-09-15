require("dotenv").config();
const cors = require("cors");
const express = require("express");
const port = 3500;
const app = express();
const path = require('path')

const sequelize = require("./db.config");
sequelize.sync().then(() => console.log("database terkoneksi"));

// middleware
app.use(cors());
app.use(express.json());

const usersEndpoint = require('./routes/user')
const advocateEndpoint = require('./routes/advocate')
const practiceEndpoint =  require('./routes/practice')
const articleEndpoint =  require('./routes/article')
// const testRoutes = require("./routes/testRoutes");

app.use('/',usersEndpoint)
app.use('/advocate',advocateEndpoint)
app.use('/practice',practiceEndpoint)
app.use('/article',articleEndpoint)
app.use(
  "/upload/advocate",
  express.static(path.join(__dirname,"upload/advocate"))
);
app.use(
  "/upload/article",
  express.static(
    path.join(__dirname, "upload", "article")
  )
);
// app.use("/api/test", testRoutes);

const PORT = process.env.PORT || 3500;
app.listen(port, () => console.log(`server berjalan di port ${port}`));
