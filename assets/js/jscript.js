var store = 
[
	{
	    "pattern": [true, false, false, false, true, false, true]
	},{

	    "pattern": [false, true, false, false, true, false, true] //booleans
	}
];	


for (var i = 0; i < store.length; i++) {	
	var $newRow = $('<div class="row" id="row' + i + '">');
	$('.drum-machine').append($newRow);
		for (var j = 0; j < store[i].pattern.length; j++){
			if (store[i].pattern[j] === true){
	    		$('#row' + [i]).append($('<div class="active-switch">'));
			} else {
	    		$('#row' + [i]).append($('<div class="unactive-switch">'));

			};
		};


};











// var saveFile = 
// [
// 	{
// 	    "file": "bd1.ogg",
// 	    "pattern": [true, false, false, false, true, false, false, false]
// 		},{

// 	    "file": "sd1.ogg", //variable for .play
// 	    "pattern": [false, false, false, false, true, false, false, true] //booleans
// 		},{

// 	    "file": "hh1.ogg",
// 	    "pattern": [false, true, true, true, false, true, true, true]
// 	}
// ];



// var i = 0
// function startLoop(){		
// 	setTimeout(function(){
// 		if (saveFile[0].pattern[i] === true){
// 			console.log("bd" + Math.random());
// 		} else {
// 			console.log("------" + Math.random());
// 		}
// 		if (saveFile[1].pattern[i] === true){
// 			console.log("sd" + Math.random());
// 		} else {
// 			console.log("------" + Math.random());
// 		}
// 		i++;
// 		if (i < 8){
// 			startLoop();
// 		} else {
// 			i = 0;
// 			startLoop();
// 		}

// 	}, 200)
// }



