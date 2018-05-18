$(document).ready(function(){
	for(y=0;y<3;y++){
  $("table").append("<tr class=border></tr>");
		for(i=0;i<3;i++){
		$("tr:eq("+y+")").append("<td class=border></td>");
		$("td").attr("id", function(index, val){
			return index+1;
		});
	  }
	}
	$("button").on("click", game);	
});

tab=[];
 player = null;
function create_initial_array(){
	
	for (x=0;x<3;x++){
			tab[x]=[];
		for(y=0;y<3;y++){
			tab[x][y]=0;
		}
	}
	console.log(tab);
}
create_initial_array();
console.log(tab.length);

function fill_in_the_grid(){						//wypełnia wartościami 0 całą tablicę dwuwymiarową
	for(i=0; i<tab.length;i++){
		for(j=0;j<tab[i].length;j++){
			var x= $("tr:eq(" + i + ")");				//szuka rzedu oraz komórki
			var y =x.find("td:eq(" + j + ")");
			y.text(" ");
		}
		
	}
}
fill_in_the_grid();

function isWinner(){
	for (x=0;x<3;x++){
		y=0;
		if((tab[x][y]==player) && (tab[x][y+1]==player) && (tab[x][y+2]==player)){
			return true;
		}
	}
	for(y=0;y<3;y++){
		x=0;
		if((tab[x][y]==player) && (tab[x+1][y]==player) && (tab[x+2][y]==player)){
			return true;
		}
	}
	x=0;
	y=0;
	if((tab[x][y]==player) && (tab[x+1][y+1]==player) && (tab[x+2][y+2]==player)){
		return true;
	}
	if((tab[x][y+2]==player) && (tab[x+1][y+1]==player) && (tab[x+2][y]==player)){
		return true;
	}
	return false;
};
function isValueZero(x,y){
					if((player==1) && (tab[x][y]==0)){		//sprawdza czy wartosc wynosi 0
						tab[x][y]=1;
						return true;
					}
					if((player==2) && (tab[x][y]==0)){
						tab[x][y]=2;
						return true;
					}			
				alert("to pole już jest uzupełnione");
				return false;
				};


function isDraw(){
					for(x=0;x<3;x++){
						for(y=0;y<3;y++){
							if(tab[x][y]==0){
								return false;
							}
						}
					} return true;
				};
				
var callbacks = $.Callbacks();
callbacks.add(playing);
				
function game(){
	create_initial_array();
		fill_in_the_grid();
		player = 1;
		var winner = false;
		//window.setTimeout(function() {
		//do {
		playing();
		//} while ((winner==false)||(draw==false)); 
		//}, 10);
}

function playing(){
	var coordinates = prompt("gdzie chcesz postawić znak?", "1a");
			console.log(coordinates);
			var pattern = /^[1-3]{1}[a-c]{1}$/		//walidacja współrzędnych
			if (pattern.test(coordinates)){				// jeśli własciwy wzór współrzędnych
				var x=coordinates.slice(0,1);  			//przetwarza współrzedne na indeks tablicy dwuwymiarowej
				var y=coordinates.slice(1,2);
				console.log(x,y);
				x=x-1;
				var z=y.charCodeAt(0);
				y=z-49;
				y= String.fromCharCode(y);
				y=parseInt(y);
				console.log(x,y);
				
				var zero=isValueZero(x,y);
				if (zero==true){
					var m= $("tr:eq(" + x + ")");				//znajduje komórkę i wstawia znak
					var n =m.find("td:eq(" + y + ")");
					if (player==1){
						n.text("O");
					} else {
						n.text("X");
					}
					winner= isWinner();
				if (winner==true){
					alert("koniec gry. wygrywa zawodnik z " + player);
					return;
				}
				
				var draw=isDraw();
				if (draw==true){
					alert("Remis");
				}
				if (player==1){
					player=2; console.log("numer gracza to " + player);
				} else{
					player=1;console.log("numer gracza to " + player);
				}
						
				}
					
			} else {
				alert("wprowadz poprawne współrzędne za pomocą cyfry i małych liter");
			}
			setTimeout(function(){ playing(); }, 1000);
}
	