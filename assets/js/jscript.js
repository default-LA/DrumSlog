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

//========================================
//initial draw when loading from savefile
//========================================
for (var i = 0; i < store.length; i++) {	
	var $newRow = $(`<div class="row" id="row` + i + `">
								<div class="left-control">
									<div class="top-controls">
										<div class="top-sect">V</div>						
										<div class="top-sect">
											<div class="mute-led">0</div>
											<div class="led-text">mute</div>
										</div>
										<div class="top-sect">
											<div class="solo-led">0</div>
											<div class="led-text">solo</div>
										</div>
									</div>
									<div class="sample-disp">bd03.ogg</div>
								</div>
								<div class="step-btn" id="step-btn` + i + `">
								
								</div>
								<div class="add-remove"></div>
							</div>`);
	$(".right-sect").append($newRow);
	//push sound variable into temp array
		for (var j = 0; j < store[i].pattern.length; j++){
			var $switchOn = $('<div id="switch' + j + '" class="switch active-switch">');
			var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
			temp[i] = temp[i] || [];
			if (store[i].pattern[j] === true){
	    		$("#step-btn" + i).append($switchOn);
	    		temp[i].push(true);
			} else {
	    		$("#step-btn" + i).append($switchOff);
	    		temp[i].push(false);

			};
		}; //++ to global variable to keep track of number of rows
};
$(".switch").click(function() {
	var x = $(this).parents().eq(1).index() - 1;
	console.log(x);
	var y = $(this).index();
	console.log(y);
	$(this).toggleClass("active-switch unactive-switch");
	if (temp[x][y] === true){
		temp[x][y] = false;
	} else {
		temp[x][y] = true;
	};
});

$(".play-btn").click(function(){
	if (playing === false){
		playing = true;
		console.log("playing");
		startLoop()
	} else {return;}
});
$(".stop-btn").click(function(){
	playing = false;
	console.log("stopped");
});

var s = 0
var playing = false;
function startLoop(){	
	if (playing === true){	
		setTimeout(function(){
			if (temp[0][s] === true){
				kick.play();

			} else {
			}
			if (temp[1][s] === true){ //make this more efficient!!!
				snare.play();
			} else {
			}
			if (temp[2][s] === true){
				hh.play();
			} else {
			}
			s++;
			if (s < temp[0].length){
				startLoop();
			} else {
				s = 0;
				startLoop();
			}
		}, 110) //bpm variable
	} else {return;}
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






