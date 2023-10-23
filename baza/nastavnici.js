const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const nastavnici = sequelize.define("nastavnici",{
        username:Sequelize.STRING,
        password_hash:Sequelize.STRING
    })
    return nastavnici;
};