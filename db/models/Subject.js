const Sequelize = require('sequelize');
const conn = require('../connection');

const Subject = conn.define('Subject', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Subject;