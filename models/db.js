const Sequelize = require('sequelize')

const mariadb = new Sequelize('forca', 'jogo', 'jogo123',{
    host: "localhost",
    dialect: "mariadb"
});

mariadb.authenticate().then(() => {
    console.log("Conectado ao banco com sucesso!")
}).catch((err) => {
    console.log("Houve uma fala ao se conectar ao banco: "+err)
});

module.exports = {
    Sequelize: Sequelize,
    mariadb: mariadb
}