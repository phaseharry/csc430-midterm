const Sequelize = require('sequelize');
const conn = require('../connection');
const User = require('./User');

const Admin = conn.define('Admin', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = Admin;