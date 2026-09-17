// const {Sequelize} = require('sequelize');
// const sequelize = new Sequelize('law_firm', 'root', '', {
//   dialect: 'mysql',
//   host: 'localhost',
// });

// sequelize.authenticate((err) => {
//     if (err){
//         console.log('Connection error: ' + err);
//     } else {
//         console.log('Database connected');
//     }
// })

// module.exports = sequelize;

// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     logging: false,
//   },
// );
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => {
//     console.error("Database connection error:", err);
//   });

// module.exports = sequelize;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        minVersion: "TLSv1.2",
      },
    },
  },
);

module.exports = sequelize;
