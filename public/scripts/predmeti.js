var div = document.getElementById("predmeti-meni");
let dugmad = document.getElementById("button");
dugmad.style.display = 'none';
PoziviAjax.getPredmeti(function(err,data){
    if(err) throw err;
    else{
        for (let predmet of data) {
            const li = document.createElement('li');
            li.id = predmet;
            li.textContent = predmet;
            div.appendChild(li);
        }
    }
});

var dugme = document.getElementById("logout").addEventListener('click', function(){
    PoziviAjax.postLogout(function(err,data){
        if(err) throw err;
        window.location.href = '/prijava.html';
    })
})

div.addEventListener('click', function(event){
    //console.log('111');
    const predmet = event.target.id;
    PoziviAjax.getPredmet(predmet, function(err,data){
        if(err) throw err;
        else{
            const poruka = JSON.parse(data);
            console.log(poruka);
            var tabela = document.getElementById('tabela');
            if(poruka.poruka == "Nije pronađen predmet"){
                dugmad.style.display = 'none';
                tabela.innerHTML = "Nije pronađen predmet";
            }
            //console.log(poruka.prisustva);
            else {
                let prisustvo = TabelaPrisustvo(tabela,poruka);
                dugmad.style.display = 'block';
                try {
                    let dugme1 = document.getElementById("dugme1");
                    let dugme2 = document.getElementById("dugme2");
                    if (!dugme1.hasAttribute('listening')) {
                      //console.log("aaaaa");
                      //console.log(dugme1);
                      //console.log(dugme2);
                      dugme1.addEventListener('click', function(){
                          prisustvo.prethodnaSedmica();
                          //console.log("bbbbb");
                      });
                      dugme1.setAttribute('listening', true);
                    }
                  
                    if (!dugme2.hasAttribute('listening')) {
                      dugme2.addEventListener('click', prisustvo.sljedecaSedmica);
                      dugme2.setAttribute('listening', true);
                    }
                  } catch (error) {
                    console.error(error);
                  }
            }
            //prisustvo.prethodnaSedmica();
            //prisustvo.sljedecaSedmica();

        }
    })
    
})