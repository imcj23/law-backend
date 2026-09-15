const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('law_firm', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

sequelize.authenticate((err) => {
    if (err){
        console.log('Connection error: ' + err);
    } else {
        console.log('Database connected');
    }
})

module.exports = sequelize;
