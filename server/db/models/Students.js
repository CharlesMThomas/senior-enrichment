const Sequelize = require('sequelize');
const db = require('../index');
const Campuses = require('./Campuses');

const Students = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0,
      max: 4.0
    }
  },
  name: {
    type: Sequelize.STRING,
    get() {
      const firstName = this.getDataValue('firstName');
      const lastName = this.getDataValue('lastName');
      return `${firstName} ${lastName}`
    }
  }
})

module.exports = Students;
