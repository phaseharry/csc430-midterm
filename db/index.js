const conn = require('./connection');
const Subject = require('./models/Subject');
const Course = require('./models/Course');
const Section = require('./models/Section');

Subject.hasMany(Course);
Course.belongsTo(Subject, { foreignKey: 'id' });

Course.hasMany(Section);
Section.belongsTo(Course, { foreignKey: 'id' });

const connectToDb = async (expressApp) => {
  try {
    await conn.sync();
    expressApp.emit('ready');
    console.log('connected to database');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = {
  connectToDb,
  models: {
    Subject,
    Course,
    Section
  }
}