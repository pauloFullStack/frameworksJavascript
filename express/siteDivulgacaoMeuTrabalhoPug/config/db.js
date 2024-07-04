const Sequelize = require('sequelize');

const connectDB = new Sequelize('codelibrary', 'user_paulo', 'Davi91445129!', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connectDB;
