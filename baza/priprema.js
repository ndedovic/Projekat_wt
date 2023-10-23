const db = require('./db.js');
db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});
function inicializacija(){
    var nastavniciLista=[];
    var predmetiLista=[];
    var studentiLista=[];
    var prisustvoLista=[];

    return new Promise(function(resolve, reject){
        prisustvoLista.push(db.prisustvo.create({sedmica:'1',predavanja:'1',vjezbe:'1',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'1',predavanja:'2',vjezbe:'1',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'1',predavanja:'1',vjezbe:'1',index:'12347'}));
        prisustvoLista.push(db.prisustvo.create({sedmica:'2',predavanja:'3',vjezbe:'1',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'2',predavanja:'1',vjezbe:'1',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'2',predavanja:'1',vjezbe:'2',index:'12347'}));
        prisustvoLista.push(db.prisustvo.create({sedmica:'3',predavanja:'1',vjezbe:'2',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'3',predavanja:'1',vjezbe:'0',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'3',predavanja:'3',vjezbe:'1',index:'12347'}));
        prisustvoLista.push(db.prisustvo.create({sedmica:'4',predavanja:'1',vjezbe:'2',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'4',predavanja:'1',vjezbe:'0',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'4',predavanja:'0',vjezbe:'1',index:'12347'}));
        prisustvoLista.push(db.prisustvo.create({sedmica:'5',predavanja:'1',vjezbe:'0',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'5',predavanja:'1',vjezbe:'1',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'5',predavanja:'2',vjezbe:'2',index:'12347'}));
        prisustvoLista.push(db.prisustvo.create({sedmica:'6',predavanja:'1',vjezbe:'2',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'6',predavanja:'0',vjezbe:'1',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'6',predavanja:'1',vjezbe:'1',index:'12347'}));
        prisustvoLista.push(db.prisustvo.create({sedmica:'7',predavanja:'1',vjezbe:'1',index:'12345'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'7',predavanja:'2',vjezbe:'1',index:'12346'}));
        //prisustvoLista.push(db.prisustvo.create({sedmica:'7',predavanja:'3',vjezbe:'1',index:'12347'}));

        Promise.all(prisustvoLista).then(function(prisustvo){
            var prisustvo1 = prisustvo.filter(function(a){return a.sedmica == "1"})[0];
            var prisustvo2 = prisustvo.filter(function(a){return a.sedmica == "2"})[0];
            var prisustvo3 = prisustvo.filter(function(a){return a.sedmica == "3"})[0];
            var prisustvo4 = prisustvo.filter(function(a){return a.sedmica == "4"})[0];
            var prisustvo5 = prisustvo.filter(function(a){return a.sedmica == "5"})[0];
            var prisustvo6 = prisustvo.filter(function(a){return a.sedmica == "6"})[0];
            var prisustvo7 = prisustvo.filter(function(a){return a.sedmica == "7"})[0];

            studentiLista.push(
                db.studenti.create({ime:'Neko Nekic',index:'12345'}).then(function(b){
                    return b.setPrisustvoStudenta([prisustvo1,prisustvo2,prisustvo3,prisustvo4,prisustvo5,prisustvo6,prisustvo7]).then(function(){
                        return new Promise(function(resolve,reject){resolve(b);});
                    })
                })
            )
            Promise.all(studentiLista).then(function(studenti){
                var student1 = studenti.filter(function(a){return a.ime == "Neko Nekic"})[0];
                predmetiLista.push(
                    db.predmeti.create({naziv:'PREDMET1'}).then(function(b){
                        return b.setStudentiPredmeta([student1]).then(function(){
                            return new Promise(function(resolve,reject){resolve(b);})
                        });
                    }));
                predmetiLista.push(
                    db.predmeti.create({naziv:'PREDMET2'}).then(function(b){
                        return b.setStudentiPredmeta([student1]).then(function(){
                            return new Promise(function(resolve,reject){resolve(b);})
                        });
                    }));
                predmetiLista.push(db.predmeti.create({naziv:'PREDMET3'}).then(function(b){
                    return b.setStudentiPredmeta([student1]).then(function(){
                        return new Promise(function(resolve,reject){resolve(b);})
                    });
                }));
                Promise.all(predmetiLista).then(function(predmeti){
                    var predmet1 = predmeti.filter(function(a){return a.naziv == "PREDMET1"})[0];
                    var predmet2 = predmeti.filter(function(a){return a.naziv == "PREDMET2"})[0];
                    var predmet3 = predmeti.filter(function(a){return a.naziv == "PREDMET3"})[0];
        
                    nastavniciLista.push(
                        db.nastavnici.create({username:'Nejra',password_hash:'$2b$10$rrEe3nMwe/D1ac0DusIhLOlinQg1tDA1Vh9hsoVtOlhXy3/RrKJGS'}).then(function(b){
                            return b.setPredmetiProfesora([predmet1,predmet2]).then(function(){
                                return new Promise(function(resolve,reject){resolve(b);});
                            });
                        }));
                    nastavniciLista.push(
                        db.nastavnici.create({username:'Neko',password_hash:'$2b$10$stRVVWYVZkge/FPJaJ9rIOsx1bZoORgaJKhzYPxrBeEzFCjN9lyj2'}).then(function(b){
                            return b.setPredmetiProfesora([predmet3]).then(function(){
                                return new Promise(function(resolve,reject){resolve(b);});
                            });
                        }));
                    Promise.all(nastavniciLista).then(function(b){resolve(b);}).catch(function(err){
                        console.log("Greska sa nastavnicima" + err);
                    });
                }).catch(function(err){
                    console.log("Greska sa predmetima" + err);
                });
            }).catch(function(err){
                console.log("Greska sa studentima" + err);
            });
        }).catch(function(err){
            console.log("Greska sa prisustvom" + err);
        });           
    });
}