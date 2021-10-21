const Sequelize = require('sequelize');
const conn = new Sequelize('classregistration', 'admin', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = conn;