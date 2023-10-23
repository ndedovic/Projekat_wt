let div = document.getElementById("divSadrzaj");
//instanciranje
let prisustvo = TabelaPrisustvo(div, {
	"studenti": [{ime:"Neko Nekic",index:12345},
	{ime:"Neko Nekic",index:12346},
	{ime:"Neko Nekic",index:12347}], 
	"prisustva":[{sedmica:1,predavanja:1,vjezbe:1,index:12345},
	{sedmica:1,predavanja:2,vjezbe:1,index:12346},
	{sedmica:1,predavanja:1,vjezbe:1,index:12347},
	{sedmica:2,predavanja:3,vjezbe:1,index:12345},
	{sedmica:2,predavanja:1,vjezbe:1,index:12346},
	{sedmica:2,predavanja:1,vjezbe:2,index:12347},
	{sedmica:3,predavanja:1,vjezbe:2,index:12345},
	{sedmica:3,predavanja:1,vjezbe:0,index:12346},
	{sedmica:3,predavanja:3,vjezbe:1,index:12347},
	{sedmica:4,predavanja:1,vjezbe:2,index:12345},
	{sedmica:4,predavanja:1,vjezbe:0,index:12346},
	{sedmica:4,predavanja:0,vjezbe:1,index:12347},
	{sedmica:5,predavanja:1,vjezbe:0,index:12345},
	{sedmica:5,predavanja:1,vjezbe:1,index:12346},
	{sedmica:5,predavanja:2,vjezbe:2,index:12347},
	{sedmica:6,predavanja:1,vjezbe:2,index:12345},
	{sedmica:6,predavanja:0,vjezbe:1,index:12346},
	{sedmica:6,predavanja:1,vjezbe:1,index:12347},
	{sedmica:7,predavanja:1,vjezbe:1,index:12345},
	{sedmica:7,predavanja:2,vjezbe:1,index:12346},
	{sedmica:7,predavanja:3,vjezbe:1,index:12347}], 
"predmet":"WT", 
"brojPredavanjaSedmicno":3, 
"brojVjezbiSedmicno":2
});
document.addEventListener("DOMContentLoaded", function(){
	let dugme1 = document.getElementById("dugme1");
	if (!dugme1.hasAttribute('listening')) {
		dugme1.addEventListener('click', prisustvo.prethodnaSedmica);
		dugme1.setAttribute('listening', true);
	}
	let dugme2 = document.getElementById("dugme2");
	if (!dugme2.hasAttribute('listening')) {
		dugme2.addEventListener('click', prisustvo.sljedecaSedmica);
		dugme2.setAttribute('listening', true);
	}
  });
//pozivanje metoda
prisustvo.prethodnaSedmica();
prisustvo.sljedecaSedmica();

