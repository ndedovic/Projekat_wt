const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const studenti = sequelize.define("studenti",{
        ime:Sequelize.STRING,
        index:Sequelize.STRING
    })
    return studenti;
};