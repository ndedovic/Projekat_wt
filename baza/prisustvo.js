const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const prisustvo = sequelize.define("prisustvo",{
        sedmica:Sequelize.INTEGER,
        predavanja:Sequelize.INTEGER,
        vjezbe:Sequelize.INTEGER,
        index:Sequelize.INTEGER,
    })
    return prisustvo;
};