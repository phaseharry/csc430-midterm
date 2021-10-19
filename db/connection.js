const Sequelize = require('sequelize');
const conn = new Sequelize('classregistration', 'admin', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectToDb = async (expressApp) => {
  try {
    await conn.sync({ force: true });
    expressApp.emit('ready');
    console.log('connected to database');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = {
  conn,
  connectToDb
}