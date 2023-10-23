const PoziviAjax = (()=>{
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", `/predmet/${naziv}`);
        ajax.onload = function(){
            if(ajax.status == 200){
                fnCallback(null, ajax.responseText);
            }else{
                fnCallback(ajax.statusText, null);
            }
        }
        ajax.send();
    }
    
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
        const ajax = new XMLHttpRequest();
        ajax.open('GET', '/predmeti-podaci', true);
        ajax.onload = function() {
            if (ajax.status === 200) {
                const predmeti = JSON.parse(ajax.responseText).predmeti;
                fnCallback(null, predmeti);
            }
        };
        ajax.send();
    }

    function impl_postLogin(username,password,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/login");
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({username:username,password:password}));
        ajax.onreadystatechange = function() {
            if (ajax.status == 200 && ajax.readyState == 4){
                fnCallback(null, ajax.responseText);
            }
            else if (ajax.readyState == 4){
                fnCallback(ajax.statusText,null);
            }
        }
    }
    function impl_postLogout(fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/logout");
        ajax.onload = function() {
            if (ajax.status == 200 && ajax.readyState == 4){
                fnCallback();
            }
            else if (ajax.readyState == 4){
                fnCallback(ajax.statusText,null);
            }
        }
        ajax.send();
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){

    }

    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();
