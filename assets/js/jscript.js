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

var temp = [];
var rowNumber = 0;
var s = 0
var playing = false;
var storeSound = "";
var bpm = 60;    
var div = 16;             
var tickTimeout = null;
var preview = null;

function drawRow(){
	var $newRow = $(`<div class="row" id="row` + rowNumber + `">
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
								<div class="step-btn" id="step-btn` + rowNumber + `">
								
								</div>
								<div class="add-remove"></div>
							</div>`);
	$(".rows").append($newRow);
} //drawRow() function
function addNew(){
	var addRow = {"sound": "snd_dr_808_bd1", "pattern": [false, false, false, false, false, false, false, false, 
					false, false, false, false, false, false, false, false, ], "volume": 100};
	temp.push(addRow);
	drawRow();
	for (var j = 0; j < 16; j++){
			var $switchOff = $('<div id="switch' + j + '" class="switch unactive-switch">');
			$("#step-btn" + rowNumber).append($switchOff);
	};
	rowNumber++;
}; //addNew() function
for (var i = 0; i < store.length; i++) {	
	drawRow();
	temp[i] = store[i];
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
}; //initial draw from savefile
$(".right-sect").on("click", ".switch", function() {  //.right-sect is static ancestor. 
	var x = $(this).parents().eq(1).index();	      //.on allows dynamically added html to be clicked.
	var y = $(this).index();
	// console.log("switch" + $(this).index() + " in index " + $(this).parents().eq(1).index() + " clicked!");
	$(this).toggleClass("active-switch unactive-switch");
	if (temp[x].pattern[y] === true){
		temp[x].pattern[y] = false;
	} else {
		temp[x].pattern[y] = true;
	};
}); //switch click on/off

$(".play-btn").click(function(){
		if (playing !== true){
			startLoop()
		} else {return;}
});

$(".stop-btn").click(function(){
	stop();
	console.log("stopped");
}); //play/stop button function

function loadSound(){
	temp.map(function(obj){
	  obj.audio = new Howl({src: ["./assets/sound/" + obj.sound + ".ogg"], volume: 1});
	});
} //map sounds from sound folder depending on temp.sound name
loadSound();

//==== FOLDER FUNCTIONAITY =====

var folderOne = 0;
var folderTwo = 0;
var folderThree = 0;
var $visFolderTwo = $("#d" + 0);
var $visFolderThree = $("#d" + 0 + 0);
var $visFolderFour = $("#d" + 0 + 0 + 0);
var selectedSound = "none";
var selectRow = "none";


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
	$(".sound-select-popup").fadeIn(100, "swing");	

});

$(".right-sect").on("click", ".add-btn", function(){
	addNew();
});

$(".ran-btn").click(function(){
	randomise();
});

$(".sran-btn").click(function(){
	srandomise();
	randomise();
});

function closeMenu(){
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
    			$("#step-btn" + i).append($switchOn);
    		} else {
    			$("#step-btn" + i).append($switchOff);
			};
		}
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
	s = ++s % div;                      
	tickTimeout = setTimeout(startLoop, 1000 * 7 / bpm);  
}

function stop() {
	playing = false;
	clearTimeout(tickTimeout);
}
