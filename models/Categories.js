const { post } = require('../routes/routes');
const db = require('./db');

const Categories = db.mariadb.define('categories', {
    name: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.STRING
    }
})

//Categories.sync({force: true})
module.exports = Categories