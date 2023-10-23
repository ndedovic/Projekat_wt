let TabelaPrisustvo = function (divRef, podaci) {
    
    //privatni atributi modula
    var br1, br2, br3, br4 = 0, br5;
    var brojac, maxSedmica, rezultat, trenutnaSedmica;

    for(var i = 0; i < podaci.prisustva.length; i++){
        if (podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno || 
            podaci.prisustva[i].vjezbe > podaci.brojVjezbiSedmicno ||
            podaci.prisustva[i].predavanja < 0 ||
            podaci.prisustva[i].vjezbe < 0)
            br1 = 1;
        for(var j = i+1; j < podaci.prisustva.length; j++){
            if (podaci.prisustva[i].index == podaci.prisustva[j].index && 
                podaci.prisustva[i].sedmica == podaci.prisustva[j].sedmica)
                br2 = 1;
        }
    }
    for(var i = 0; i < podaci.studenti.length; i++){
        for(var j = i+1; j < podaci.studenti.length; j++){
            if (podaci.studenti[i].index == podaci.studenti[j].index)
                br3 = 1;
        }
    }
    for(var i = 0; i < podaci.prisustva.length; i++){
        for(var j = 0; j < podaci.studenti.length; j++){
            if (podaci.prisustva[i].index == podaci.studenti[j].index) br4 = 1;
            else br4 = 0;
        }
        if (br4 == 0) br4 = 2;
    }
    maxSedmica = 0;
    for(var i = 0; i < podaci.prisustva.length; i++){
        if(podaci.prisustva[i].sedmica > maxSedmica) maxSedmica = podaci.prisustva[i].sedmica;
    }
    trenutnaSedmica = maxSedmica;
    brojac = 1;
    for(var i = 0; i < podaci.prisustva.length;){
        if(podaci.prisustva[i].sedmica != brojac) br5 = 1;
        i+=podaci.studenti.length;
        brojac++;
    }
    
    let KreirajTabelu = function(trenutnaSedmica){  
        console.log(podaci);
    rezultat = "<p>";
    rezultat += podaci.predmet;
    rezultat += "</p>";
    rezultat += "<table>";
    rezultat += "<tr>";
    rezultat += "<th style=\"width: 8%;\">";
    rezultat += "<span>Ime i </span>";
    rezultat += "<span>prezime </span>";
    rezultat += "</th>";
    rezultat += "<th style=\"width: 5%;\">";
    rezultat += "Index";
    rezultat += "</th>";
    for(var i = 0; i < podaci.prisustva.length/podaci.studenti.length; i++){
        if (i == maxSedmica - 1) rezultat += "<th style=\"width: 11%;\">";
        else rezultat += "<th style=\"width: 8%;\">";
        if (i == 0)
            rezultat += "I";
        else if (i == 1)
            rezultat += "II";
        else if (i == 2)
            rezultat += "III";
        else if (i == 3)
            rezultat += "IV";
        else if (i == 4)
            rezultat += "V";
        else if (i == 5)
            rezultat += "VI";
        else if (i == 6)
            rezultat += "VII";
        else if (i == 7)
            rezultat += "VIII";
        else if (i == 8)
            rezultat += "IX";
        else if (i == 9)
            rezultat += "X";
        else if (i == 10)
            rezultat += "XI";
        else if (i == 11)
            rezultat += "XII";
        else if (i == 12)
            rezultat += "XIII";
        else if (i == 13)
            rezultat += "XIV";
        else if (i == 14)
            rezultat += "XV";
        rezultat += "</th>";
    }
        if (podaci.prisustva.length/podaci.studenti.length == 0)
            rezultat += "<th style=\"width: 75%;\"> I-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 1)
            rezultat += "<th style=\"width: 70%;\"> II-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 2)
            rezultat += "<th style=\"width: 65%;\"> III-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 3)
            rezultat += "<th style=\"width: 60%;\"> IV-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 4)
            rezultat += "<th style=\"width: 55%;\"> V-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 5)
            rezultat += "<th style=\"width: 50%;\"> VI-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 6)
            rezultat += "<th style=\"width: 45%;\"> VII-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 7)
            rezultat += "<th style=\"width: 40%;\"> VIII-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 8)
            rezultat += "<th style=\"width: 35%;\"> IX-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 9)
            rezultat += "<th style=\"width: 30%;\"> X-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 10)
            rezultat += "<th style=\"width: 25%;\"> XI-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 11)
            rezultat += "<th style=\"width: 20%;\"> XII-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 13)
            rezultat += "<th style=\"width: 15%;\"> XIV-XV </th>";
        else if (podaci.prisustva.length/podaci.studenti.length == 14)
            rezultat += "<th style=\"width: 10%;\"> XV </th>";


    
    rezultat += "</tr>";
    for(var i = 0; i < podaci.studenti.length; i++){
        rezultat += "<tr>";
        rezultat += "<td style=\"padding-top: 10px;\">";
        rezultat += podaci.studenti[i].ime;
        rezultat += "</td>";
        rezultat += "<td style=\"padding-top: 10px;\">";
        rezultat += podaci.studenti[i].index;
        rezultat += "</td>";
        for(var j = 0; j < podaci.prisustva.length; j++){
            if(podaci.prisustva[j].index == podaci.studenti[i].index && podaci.prisustva[j].sedmica == trenutnaSedmica){
                rezultat += "<td>";
                rezultat += "<table id=\"nova_tabela\">";
                rezultat += "<tr>";
                for(var k = 0; k < podaci.brojPredavanjaSedmicno; k++){
                    rezultat += "<td>";
                    rezultat += "<span>P</span>";
                    rezultat += "<span>";
                    rezultat += (k+1);
                    rezultat += "</span>";
                    rezultat += "</td>";
                }
                for(var l = 0; l < podaci.brojVjezbiSedmicno; l++){
                    rezultat += "<td>";
                    rezultat += "<span>V</span>";
                    rezultat += "<span>";
                    rezultat += (l+1);
                    rezultat += "</span>";
                    rezultat += "</td>";
                }
                rezultat += "</tr>";
                rezultat += "<tr>";
                for(var  m = 0; m < podaci.brojPredavanjaSedmicno; m++){
                    if(m <= podaci.prisustva[j].predavanja-1){
                        rezultat += "<td>";
                        rezultat += "<div class = \"zeleni\">";
                        rezultat += "</div>";
                        rezultat += "</td>";
                    }else{
                        rezultat += "<td>";
                        rezultat += "<div class = \"crveni\">";
                        rezultat += "</div>";
                        rezultat += "</td>";
                    }
                }
                for(var n = 0; n < podaci.brojVjezbiSedmicno; n++){
                    if(n <= podaci.prisustva[j].vjezbe-1){
                        rezultat += "<td>";
                        rezultat += "<div class = \"zeleni\">";
                        rezultat += "</div>";
                        rezultat += "</td>";
                    }else{
                        rezultat += "<td>";
                        rezultat += "<div class = \"crveni\">";
                        rezultat += "</div>";
                        rezultat += "</td>";
                    }
                }
                rezultat += "</tr>";
                rezultat += "</table>";
                rezultat += "</td>";
            }
            if(podaci.prisustva[j].index == podaci.studenti[i].index && podaci.prisustva[j].sedmica != trenutnaSedmica){
                rezultat += "<td style=\"padding-top: 10px;\">";
                var pomocna1 = ((podaci.prisustva[j].predavanja + podaci.prisustva[j].vjezbe) / (podaci.brojPredavanjaSedmicno +podaci.brojVjezbiSedmicno))*100;
                rezultat += pomocna1;
                rezultat += "%";
                rezultat += "</td>"
            }
        }
        rezultat += "<td></td>";
        rezultat += "</tr>";
    }
    
    rezultat += "</table>";
    //rezultat += "<button id=\"dugme1\"><i class=\"fa-solid fa-arrow-left\"></i></button>";
    //rezultat += "<button id=\"dugme2\"><i class=\"fa-solid fa-arrow-right\"></i></button>";
    return rezultat;
    }
    
    if(br1 == 1 || br2 == 1 || br3 == 1 || br4 == 2 || br5 == 1){
        divRef.innerHTML = "Podaci o prisustvu nisu validni!";

    }
    else {
        divRef.innerHTML = KreirajTabelu(trenutnaSedmica);
    }
        
    let prethodnaSedmica = function () {
        //console.log('Kliknuto dugme');
        //console.log(trenutnaSedmica);
        //console.log('***');
        if(trenutnaSedmica != 1){
            trenutnaSedmica--;
            divRef.innerHTML = KreirajTabelu(trenutnaSedmica);   
        }
    }
    let sljedecaSedmica = function () {
        //console.log(trenutnaSedmica);
        //console.log('///');
        if(trenutnaSedmica != maxSedmica){
            trenutnaSedmica++;
            divRef.innerHTML = KreirajTabelu(trenutnaSedmica);
        }
    }
    return {
        prethodnaSedmica: prethodnaSedmica,
        sljedecaSedmica: sljedecaSedmica
        
    }
};