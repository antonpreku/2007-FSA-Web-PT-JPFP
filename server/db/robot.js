const Sequelize = require('sequelize')
const db = require('./database')
const Project = require('./project')

const Robot = db.define('robot', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://pixabay.com/images/id-1214536/',
    },

    fuelType: {
        type: Sequelize.ENUM('gas', 'diesel', 'electric'),
        defaultValue: 'electric'
    },

    fuelLevel: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0,
            max: 100
        }

    },
})

Robot.findProjects = function () {
    const robots =  Robot.findAll({
        include: {
          model: Project,
        where: {
          robotId: {
              $col: 'projectId'
                }
            }
        }
    })
    return robots
  }

module.exports = Robot