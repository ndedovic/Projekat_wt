document.getElementById('submit').addEventListener('click', function(event){
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    PoziviAjax.postLogin(username, password, function(err, data){
        if(err){
            throw err;
        }else{
            const poruka = JSON.parse(data);
            var div1 = document.getElementById('poruka1');
            var div2 = document.getElementById('poruka2');
            if(poruka.poruka === "Uspješna prijava"){
                div1.innerHTML = poruka.poruka;
                /*PoziviAjax.getPredmeti(function(err,data){
                    if(err) throw err;
                    else{
                        document.getElementById("meni_predmeti").innerHTML = JSON.parse(data);
                    }
                });*/
                setTimeout(() => {
                window.location.href =  '/predmeti';
                }, 1000);
            }else{
                div2.innerHTML = poruka.poruka;
            }
            

        }
    })
})