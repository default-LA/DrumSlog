
var store = [{"pattern": [true, false, false, true]}, //pseudodata from database
			 {"pattern": [false, true, false, false]}];	

var temp = []; //temp boolean data to be altered in real time


for (var i = 0; i < 2; i++){
	var $newRow = $('<div class="row" id="row' + i + '">');
	$('.page-container').append($newRow);
		for (var j = 0; j < 4; j++){
		var $switchOn = $('<div id="switch' + j + '" class="switch active-switch">');
		var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
		temp[i] = temp[i] || [];
			if (store[i].pattern[j] === true){
	    		$('#row' + [i]).append($switchOn);
	    		temp[i].push(true);
			} else {
	    		$('#row' + [i]).append($switchOff);
	    		temp[i].push(false);
			}
		}
};

$(".switch").click(function() {
  $(this).toggleClass("active-switch unactive-switch");
  //something here to alter the boolean at temp[x][y]
  console.log(temp[0]); //print altered array in console
});



var l = 0	

function startLoop(){	
	setTimeout(function(){
		if (temp[0][l] === true){
			console.log("1" + temp[0][l]);
		} else {
			console.log("-");
		}
		if (temp[1][l] === true){
			console.log("2" + temp[0][l]);
		} else {
			console.log("-");
		}
		l++;
		if (l < 4){
			startLoop();
		} else {
			l = 0;
			startLoop();
		}

	}, 200) 
}