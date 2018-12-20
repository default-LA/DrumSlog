var store = 
[
	{
		"sound": "snd_dr_808_bd1",
	    "pattern": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
	    "volume": 1
	},{
		"sound": "snd_dr_808_sd1",
	    "pattern": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], //booleans
	    "volume": 1 
	},{
		"sound": "snd_dr_808_chh0",
	    "pattern": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
	    "volume": 1 
	},{
		"sound": "snd_dr_808_ohh0",
	    "pattern": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
	    "volume": 1
	}
]; //save file with drum patterns and which sound file to use

// var temp = [];
var rowNumber = 0;
var tempNumber = 0;
var s = 0
var playing = false;
var storeSound = "";
var bpm = 130;    
var div = 16;             
var tickTimeout = null;
var preview = null;
var temp = store;
var folderOne = 0;
var folderTwo = 0;
var folderThree = 0;
var $visFolderTwo = $("#d" + 0);
var $visFolderThree = $("#d" + 0 + 0);
var $visFolderFour = $("#d" + 0 + 0 + 0);
var selectedSound = "none";
var selectRow = "none";
var glitchPlay = false;
var clicked = false;
var muted = [false, false, false, false, false, false, false, false, false, false];

$(".bpm-disp").text(bpm + " bpm")


function drawRow(){
	var $newRow = $(`<div class="row" id="row` + rowNumber + `">
								<div class="left-control">
								<div class="sample-disp">` + temp[tempNumber].sound + `</div>
									<div class="top-controls">
										<div class="volume-slide">
										<input type="range" min="1" max="100" value="100" step="1" id="slide` + rowNumber + `" class="slider" id="volume"></div>					
										<div class="top-sect">
											<div class="mute-led"></div>
											<div class="led-text">mute</div>
										</div>
										<div class="top-sect">
											<div class="solo-led"></div>
											<div class="led-text">solo</div>
										</div>
									</div>
								</div>
								<div class="inst-blink"></div>
								<div class="step-btn" id="step-btn` + rowNumber + `">
								<div class="add-remove"><div class="white-rec"></div></div>
								</div>
							</div>`);
	$(".rows").append($newRow);
} //drawRow() function
function addNew(){
	var addRow = {"sound": "No Sound Loaded", "pattern": [false, false, false, false, false, false, false, false, 
					false, false, false, false, false, false, false, false, ], "volume": 1};
	temp.push(addRow);
	drawRow();
	for (var j = 0; j < 16; j++){
		var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
		$("#step-btn" + rowNumber).append($switchOff);
	};
	rowNumber++;
	tempNumber++;
}; //addNew() function

for (var i = 0; i < store.length; i++) {	
	drawRow();
	//push sound variable into temp array
		for (var j = 0; j < temp[i].pattern.length; j++){
			var $switchOn = $('<div id="switch' + j + '" class="switch active-switch">');
			var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
			if (temp[i].pattern[j] === true){
	    		$("#step-btn" + i).append($switchOn);
	    		} else {
	    		$("#step-btn" + i).append($switchOff);
			};
		};
	rowNumber++;
	tempNumber++;
}; //initial draw from savefile

$(".right-sect").on("click", ".switch", function() {  //.right-sect is static ancestor. 
		var x = $(this).parents().eq(1).index();	  //.on allows dynamically added html to be clicked.
		var y = $(this).index();
		if (temp[x].sound == "No Sound Loaded"){
			$('.sample-disp').eq(x).addClass("alert").stop().delay(500).queue(function(){
 				$(this).removeClass("alert");
			});
			return;
		}
		y = y - 1;
		$(this).toggleClass("active-switch unactive-switch");
		if (temp[x].pattern[y] === true){
			temp[x].pattern[y] = false;
		} else {
			temp[x].pattern[y] = true;
		};
}); //switch click on/off

$(".right-sect").on("click", ".mute-led", function(){
	var m = $(this).parents().eq(3).index();
	$(".solo-led").removeClass("solo-lit");
	$(this).toggleClass("mute-lit");
	if (temp[m].audio._volume != 0){
		temp[m].audio._volume = 0;
		muted[m] = true

	} else { 
		temp[m].audio._volume = 1;
		muted[m] = false;
	}	
});

$(".right-sect").on("click", ".solo-led", function(){
	$(".solo-led").removeClass("solo-lit");
	$(this).toggleClass("solo-lit");
	var n = $(this).parents().eq(3).index();
	for (var i = 0; i < temp.length; i++){
		temp[i].audio._volume = 0;
		$(".mute-led").addClass("mute-lit");
		muted[i] = true;
	}
	temp[n].audio._volume = 1;
	muted[n] = false;
	$(".mute-led").eq(n).removeClass("mute-lit");
});

function muteState(){
	for (var i = 0; i < temp.length; i++){
		if (temp[i].audio._volume < 0.01){
			muted.push(true);
		} else {
			muted.push(false);
		}
	}
} //mute state array function

$(".play-btn").click(function(){
	$(this).addClass("btn-inset");
		if (playing !== true){
			startLoop()
		} else {return;}
}); //play loop


$(".left-sect").on("mousedown", ".stop-btn", function(){
	stop();
	$(".play-btn").removeClass("btn-inset");
	$(".stop-btn").addClass("btn-inset");
	clicked = true;
}); //play/stop button function

$(".left-sect").on("mouseup", ".stop-btn", function(){
	if (clicked){
		clicked = false;
		$(".stop-btn").removeClass("btn-inset");

	}
});


$(".bpm-up").on("mousedown", function(){	
	clicked = true
	$(this).addClass("btn-inset");
	
	if (bpm >= 220){
		return;
	} else {
		bpm++;
		$(".bpm-disp").text(bpm + " bpm");
		$(".bpm-down").removeClass("btn-grey");
		if (bpm >= 220){
			$(this).addClass("btn-grey");
		}

	}
}); //bpm up

$(".bpm-down").on("mousedown", function(){
	clicked = true
	$(this).addClass("btn-inset");	
	if (bpm <= 30){
		return;
	} else {
		bpm--;
		$(".bpm-up").removeClass("btn-grey");
		$(".bpm-disp").text(bpm + " bpm");
		if (bpm <= 30){
			$(this).addClass("btn-grey");
		}		
	}
}); //bpm down
$(".left-sect").on("mouseup", ".bpm-up", function(){
	if (clicked){
		clicked = false;
		$(this).removeClass("btn-inset");

	}
});
$(".left-sect").on("mouseup", ".bpm-down", function(){
	if (clicked){
		clicked = false;
		$(this).removeClass("btn-inset");

	}
});

function loadSound(){
	temp.map(function(obj){
	  obj.audio = new Howl({src: ["./assets/sound/" + obj.sound + ".ogg"], volume: 1});
	});
	for (var i = 0; i < temp.length; i++){
		if (muted[i] != false){
			temp[i].audio._volume = 0;
		} else {
			temp[i].audio._volume = 1;
		}
	}
} //map sounds from sound folder depending on temp.sound name
loadSound();

//==== FOLDER FUNCTIONAITY =====

$(".menu-folder-one").on("click", "li", function() { 
	$(".menu-folder-one").find("li").removeClass("menu-toggle");
	folderOne = $(this).index();	
	$visFolderTwo.hide();
	$visFolderThree.hide();
	$visFolderFour.hide();
	$visFolderTwo = $("#d" + folderOne);	
	$visFolderTwo.show();	
	$(this).addClass("menu-toggle");
});

$(".menu-folder-two").on("click", "li", function() { 
	$(".menu-folder-two").find("li").removeClass("menu-toggle");
	folderTwo = $(this).index();		
	$visFolderThree.hide();
	$visFolderFour.hide();
	$visFolderThree = $("#d" + folderOne + folderTwo);	
	$visFolderThree.show();	
	$(this).addClass("menu-toggle");

});

$(".menu-folder-three").on("click", "li", function() { 
	$(".menu-folder-three").find("li").removeClass("menu-toggle");
	folderThree = $(this).index();		
	$visFolderFour.hide();
	$visFolderFour = $("#d" + folderOne + folderTwo + folderThree);	
	$visFolderFour.show();	
	$(this).addClass("menu-toggle");

});

$(".sound-item").click(function() {  
	$(".menu-folder-four").find("li").removeClass("menu-toggle");	
	selectedSound = $(this).index(".sound-item");
	preview = new Audio("./assets/sound/" + soundNames[selectedSound] + ".ogg");
	preview.play();
	console.log(selectedSound);
	$(this).addClass("menu-toggle");

});

$(".okay-btn").click(function(){
	if (selectedSound != "none") {
		console.log(soundNames[selectedSound]);
		temp[selectRow].sound = soundNames[selectedSound];
		$(".sample-disp").eq(selectRow).text(soundNames[selectedSound]);
		loadSound();
		closeMenu();
	}
});

$(".canc-btn").click(function(){
	closeMenu();
});

$(".right-sect").on("click", ".sample-disp", function(){
	selectRow = $(this).parents().eq(1).index();
	$(".tech-sect").addClass("blur");
	$(".badge").addClass("blur");
	$(".sound-select-popup").fadeIn(100, "swing");

});

$(".right-sect").on("mousedown", ".add-but", function(){
	$(this).addClass("btn-inset");
	clicked = true;
	if (tempNumber < 10){
		addNew();
		if (tempNumber >= 10){
			$(".add-but").addClass("btn-grey");
		}
	} else {return;}	
});
$(".right-sect").on("mouseup", ".add-but", function(){
	if (clicked){
		$(this).removeClass("btn-inset");
		clicked = false;
	}
});


$(".cle-btn").on("mousedown", function(){
	$(this).addClass("btn-inset");
	clicked = true
	clearAll();
});

$(".cle-btn").on("mouseup", function(){
	if (clicked){
		clicked = false
		$(this).removeClass("btn-inset");
	}
});

$(".ran-btn").on("mousedown", function(){
	randomise();
	$(this).addClass("btn-inset");
	clicked = true
});
$(".ran-btn").on("mouseup", function(){
	if (clicked){
		clicked = false
		$(this).removeClass("btn-inset");
	}
});

$(".sran-btn").on("mousedown", function(){
	$(this).addClass("btn-inset");
	clicked = true
	srandomise();
	randomise();
});

$(".sran-btn").on("mouseup", function(){
	if (clicked){
		clicked = false
		$(this).removeClass("btn-inset");
	}
});

$(".glitch-btn").click(function(){
	$(this).toggleClass("orange");
	$(this).toggleClass("btn-inset");
	glitch();
})

$(".right-sect").on("input", ".volume-slide", function() {
	var volNum = null;
	var slidey = $(this).parents().eq(2).index(); //eq(2) tells how many layers back static ref is
	var slider = $(".slider").eq(slidey).val();
	volNum = parseInt(slider) / 100;
	temp[slidey].audio._volume = volNum;
	if (temp[slidey].audio._volume <= 0.01){
		$(".mute-led").eq(slidey).addClass("mute-lit");
		muted[slidey] = true;
	} else {
		$(".mute-led").eq(slidey).removeClass("mute-lit");
		muted[slidey] = false;
	}
});

function closeMenu(){
	$(".tech-sect").removeClass("blur");
	$(".badge").removeClass("blur");
	$(".sound-select-popup").fadeOut(100, "swing");
	$(".sound-select-popup").find("li").removeClass("menu-toggle");

	selectedSound = "none";
	selectRow = "none";
	$visFolderTwo.hide();
	$visFolderThree.hide();
	$visFolderFour.hide();
}

function randomise(){
	$(".switch").remove();
	for (var i = 0; i < temp.length; i++){
		for (var j = 0; j < temp[i].pattern.length; j++){
			var rand = Math.random() >= 0.7;
			temp[i].pattern[j] = rand;
			// drawRows();
			var $switchOn = $('<div id="switch' + j + '" class="switch active-switch">');
			var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
			if (temp[i].pattern[j] === true){
    			$(".step-btn:eq(" + i + ")").append($switchOn);
    		} else {
    			$(".step-btn:eq(" + i + ")").append($switchOff);
			};
		}
	}
}

function clearAll(){
	$(".switch").remove();
	for (var i = 0; i < temp.length; i++){
		for (var j = 0; j < temp[i].pattern.length; j++){
			temp[i].pattern[j] = false;
			var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
			if (temp[i].pattern[j] === false){
    			$(".step-btn:eq(" + i + ")").append($switchOff);
    		}
   		}
	}
}

$(".right-sect").on("click", ".add-remove", function(){
	var rowClicked = $(this).parents().eq(1).index();
	$(this).parents().eq(1).fadeOut(200, "swing", function(){
		$(this).remove();
		temp.splice(rowClicked, 1);
		tempNumber--;
		if (tempNumber <= 9){
			$(".add-but").removeClass("btn-grey");
		}
	});	
});


function glitch(){	
	if (glitchPlay !== true){
		glitchPlay = true;
	} else {
		glitchPlay = false
		
	}	
}

function srandomise(){
	for (var i = 0; i < temp.length; i++){
		var rand = Math.round(Math.random() * 441);
		temp[i].sound = soundNames[rand];
		$(".sample-disp").eq(i).text(soundNames[rand]);
	}
	loadSound();
}

function startLoop(){
	playing = true;
	temp.forEach(function(obj) {
		$(".led:eq(" + s + ")").addClass("red-led-lit");
			setTimeout(function () { 
			    $(".led:eq(" + s + ")").removeClass("red-led-lit");

			}, 10);
			if (s == 0 || s == 4 || s == 8 || s == 12) {
				$(".tri-play").addClass("tri-play-lit");				
				setTimeout(function () { 
					$(".tri-play").removeClass("tri-play-lit");				
				}, 200);

				if (s == 0){
					$(".led-two").addClass("three-led-lit");
					setTimeout(function () { 
				    $(".led-two").removeClass("three-led-lit");
					}, 300);
				} else {
					$(".led-two").addClass("two-led-lit");
					setTimeout(function () { 
				    $(".led-two").removeClass("two-led-lit");
					}, 300);
				}
			}   
		    if (obj.pattern[s]) {
		    	obj.audio.stop();
		    	obj.audio.play();
		    }
		   	});
			// if (obj.pattern[s]){
			// 	$(".inst-blink").addClass("inst-blink-lit");
   //  			setTimeout(function () { 
			//    		$(".inst-blink").removeClass("inst-blink-lit");
			// 	}, 50);
			// }

	if (glitchPlay !== true) { 
		s = ++s % div; 
	} else {
		s = Math.round(Math.random() * 15);
		// var bpmRand = Math.round(Math.random() * (10 - 1));
		// tickTimeout = setTimeout(startLoop, 1000 * bpmRand / bpm); 
	}
	tickTimeout = setTimeout(startLoop, 15000 / bpm); 
}

function stop() {
	playing = false;
	clearTimeout(tickTimeout);
}

    