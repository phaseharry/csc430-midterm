const bcrypt = require('bcrypt');
const conn = require('./connection');
const Subject = require('./models/Subject');
const Course = require('./models/Course');
const Section = require('./models/Section');
const User = require('./models/User');
const Student = require('./models/Student');
const Professor = require('./models/Professor');
const Admin = require('./models/Admin');

const seed = async () => {
  try {
    await conn.sync({ force: true });
    const [math, biology, computerScience, english] = await Promise.all([
      Subject.create({
        name: 'Mathematics'
      }),
      Subject.create({
        name: 'Biology'
      }),
      Subject.create({
        name: 'Computer Science'
      }),
      Subject.create({
        name: 'English'
      }),
    ]);

    const mathCourses = await Promise.all([
      Course.create({
        name: 'Algebra',
        code: 'MTH 101',
        subjectId: math.id
      }),
      Course.create({
        name: 'Trigonometry',
        code: 'MTH 110',
        subjectId: math.id
      }),
      Course.create({
        name: 'Calculus I',
        code: 'MTH 201',
        subjectId: math.id
      }),
      Course.create({
        name: 'Calculus II',
        code: 'MTH 202',
        subjectId: math.id
      })
    ]);

    const bioCourses = await Promise.all([
      Course.create({
        name: 'Intro to Biology',
        code: 'BIO 101',
        subjectId: biology.id
      }),
      Course.create({
        name: 'DNA',
        code: 'BIO 110',
        subjectId: biology.id
      }),
      Course.create({
        name: 'Micro Biology',
        code: 'BIO 201',
        subjectId: biology.id
      }),
      Course.create({
        name: 'Ecosystem',
        code: 'BIO 202',
        subjectId: biology.id
      })
    ])

    await Promise.all([
      Section.create({
        courseId: mathCourses[3].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[3].id,
        sectionCode: '002',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[3].id,
        sectionCode: '003',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[0].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: mathCourses[0].id,
        sectionCode: '002',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[0].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[0].id,
        sectionCode: '002',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[1].id,
        sectionCode: '001',
        availableSeats: 30
      }),
      Section.create({
        courseId: bioCourses[1].id,
        sectionCode: '002',
        availableSeats: 30
      }),
    ]);
    const hashedPasswords = await Promise.all([bcrypt.hash('12345', 10), bcrypt.hash('12345', 10), bcrypt.hash('12345', 10)]);
    const [harry, ahmad, amena] = await Promise.all([
      User.create({
        email: 'harry@gmail.com',
        password: hashedPasswords[0],
        firstName: 'Harry',
        lastName: 'Chen',
        role: 'student'
      }),
      User.create({
        email: 'ahmad@gmail.com',
        password: hashedPasswords[1],
        firstName: 'Ahmad',
        lastName: 'Hamoudeh',
        role: 'professor'
      }),
      User.create({
        email: 'amena@gmail.com',
        password: hashedPasswords[2],
        firstName: 'Amena',
        lastName: 'Foshanji',
        role: 'admin'
      }),
    ])
    const [studentHarry] = await Promise.all([
      Student.create({
        userId: harry.id,
      })
    ])
    const [professorAhmad] = await Promise.all([
      Professor.create({
        userId: ahmad.id
      })
    ])
    const [adminAmena] = await Promise.all([
      Admin.create({
        userId: amena.id
      })
    ])
    console.log('Seed successfully ran!');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

seed();