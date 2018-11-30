var kick = new Howl({
	src: ["BT0A0D3.ogg"]
});
var snare = new Howl({
	src: ["Snare_007_PL.ogg"], 
	volume: 0.8
});
var hh = new Howl({
	src: ["HHCD0.ogg"], //push variables into src when user can select sound
	volume: 0.5
});
//save file with drum patterns and which sound file to use
var store = 
[
	{
	    "pattern": [true, false, false, false, true, true, false, false, true, false, false, false, true, false, true, false]
	},{

	    "pattern": [false, true, false, true, false, false, true, false, false, true, false, false, true, false, true, true] //booleans
	},{

	    "pattern": [true, true, false, false, true, true, true, false, true, false, true, false, true, false, true, false]
	}
];
var temp = [] //contain pattern, sound variable, volume
//initial draw when loading from savefile
for (var i = 0; i < store.length; i++) {	
	var $newRow = $('<div class="row" id="row' + i + '">');
	$('.drum-machine').append($newRow);
	//push sound variable into temp array
		for (var j = 0; j < store[i].pattern.length; j++){
			var $switchOn = $('<div id="switch' + j + '" class="switch active-switch">');
			var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
			temp[i] = temp[i] || [];
			if (store[i].pattern[j] === true){
	    		$('#row' + [i]).append($switchOn);
	    		temp[i].push(true);
			} else {
	    		$('#row' + [i]).append($switchOff);
	    		temp[i].push(false);
			};
		}; //++ to global variable to keep track of number of rows
};
$(".switch").click(function() {
	var x = $(this).parent().index();
	var y = $(this).index();
	$(this).toggleClass("active-switch unactive-switch");
	if (temp[x][y] === true){
		temp[x][y] = false;
	} else {
		temp[x][y] = true;
	};
});
var i = 0
function startLoop(){		
	setTimeout(function(){
		if (temp[0][i] === true){
			kick.play();

		} else {
		}
		if (temp[1][i] === true){ //make this more efficient!!!
			snare.play();
		} else {
		}
		if (temp[2][i] === true){
			hh.play();
		} else {
		}
		i++;
		if (i < temp[0].length){
			startLoop();
		} else {
			i = 0;
			startLoop();
		}
	}, 110) //bpm variable
}
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






