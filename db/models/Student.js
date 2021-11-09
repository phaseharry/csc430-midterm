const Sequelize = require('sequelize');
const conn = require('../connection');
const User = require('./User');

const Student = conn.define('Student', {
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
  },
  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 4.0,
    validation: {
      min: 0,
      max: 4
    }

  }
});

module.exports = Student;