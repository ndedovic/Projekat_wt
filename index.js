const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require("path");

const db = require('./baza/db.js');
const { callbackify } = require('util');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname+"/public"));
app.set('views', path.join(__dirname, 'views'));

app.get("/prisustvo.html",function(req,res){        
    res.sendFile(__dirname + "/public/html/prisustvo.html");
});

app.get("/predmet.html",function(req,res){        

    res.sendFile(__dirname + "/public/html/predmet.html");
});

app.get("/predmeti",function(req,res){ //preko ove rute dobijam strancu predmeti.html  
  if(req.session.username){
    res.sendFile(__dirname + "/public/html/predmeti.html");
  }else{
    res.json({ greska: 'Nastavnik nije loginovan' });
  } 
});


app.get("/prijava.html",function(req,res){        

    res.sendFile(__dirname + "/public/html/prijava.html");
});

app.post('/login', async function(req,res){
	const username = req.body.username;
	const password = req.body.password;
  //var brojac = 0;
	let nastavnik = await db.nastavnici.findOne({where:{username:username}});
    if(nastavnik){
      let result = await bcrypt.compare(password, nastavnik.password_hash);
        if (result){
          req.session.username = username;
            let predmeti = [];
            let resSet = await nastavnik.getPredmetiProfesora();
              resSet.forEach(predmet => {
              predmeti.push(predmet.naziv);
            });
            req.session.predmeti = predmeti;
            //console.log(predmeti);
            //console.log(req.session.predmeti);
            res.json({poruka:'Uspješna prijava'});
        }else{
          res.json({poruka:'Neuspješna prijava'});
        }
    }else{
      res.json({poruka:'Neuspješna prijava'});
    }
  });

  app.get('/predmeti-podaci', (req, res) => { //ovu rutu sam dodala da bih mogla uzeti podatke iz sesije
    if(req.session.username){
      const predmeti = req.session.predmeti;
      res.json({ predmeti });
    }else{
      res.json({ greska: 'Nastavnik nije loginovan' });
    }
  });

app.post('/logout', function(req, res){
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect("/prijava.html");
  })
});

app.get('/predmet/:NAZIV', (req, res) => {
  // Provjera da li je korisnik loginovan
  if (req.session.username) {
    // Dohvaćanje podataka o prisustvu iz datoteke prisustva.json
    db.predmeti.findOne({
      where: {
          naziv: req.params.NAZIV
      }
    }).then(function(predmet) {
      //console.log(predmet.id);
      //console.log("///////////////");
      db.studenti.findOne({where:{predmetiId:predmet.id}}).then(function(student){
        //console.log(student + "*********");
        if(student){
        student.getPrisustvoStudenta().then(function(resSet){
          console.log(resSet.sedmica);
          var prisustvo=[];
          if(resSet){
            resSet.forEach(p =>{
              prisustvo.push("sedmica:");
              prisustvo.push(p.sedmica);
              prisustvo.push("predavanja:");
              prisustvo.push(p.predavanja);
              prisustvo.push("vjezbe:");
              prisustvo.push(p.vjezbe);
              prisustvo.push("index:");
              prisustvo.push(p.index);
            });
            res.json({
              predmet:predmet.naziv,
              studenti:{ime:student.ime, index:student.index},
              prisustva:{prisustvo}
            });
          }else{
            res.json({poruka:"Nije pronađen predmet"});
          }
        
        });
      }else{
        res.json({poruka:"Nije pronađen predmet"});
      }
      });
  });
}     
});
app.listen(3000);