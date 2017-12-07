const Sequelize = require('sequelize');
const db = require('../index');

const Campuses = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://i.imgur.com/kcbubjC.jpg'
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Campuses;
