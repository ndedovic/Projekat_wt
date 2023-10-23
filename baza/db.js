const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt22","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.nastavnici = require('./nastavnici.js')(sequelize);
db.predmeti = require('./predmeti.js')(sequelize);
db.studenti = require('./studenti.js')(sequelize);
db.prisustvo = require('./prisustvo.js')(sequelize);

//relacije
// Veza 1-n jedan profesor moze predavati vise predmeta
db.nastavnici.hasMany(db.predmeti,{as:'predmetiProfesora'});
db.studenti.hasMany(db.prisustvo,{as:'prisustvoStudenta'});
db.predmeti.hasMany(db.studenti,{as:'studentiPredmeta'});

module.exports=db;