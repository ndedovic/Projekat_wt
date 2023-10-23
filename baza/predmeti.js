const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const predmeti = sequelize.define("predmeti",{
        naziv:Sequelize.STRING,
    })
    return predmeti;
};