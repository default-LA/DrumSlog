# DS-606c (*formerly DrumSlog*)
The DS-606c is a drum machine built using JavaScript/jQuery, HTML and CSS. It takes advantage of the howler.js audio library for sample playback to enable smooth playback of multiple sounds, and the ability to control each sound (volume, speed, pan, etc) in real time. The program features a Random and Random+ button, generates random combinations of sounds and steps, generating it's own drum patterns.


## Motivation
I wanted to build a web-based drum machine that supported the feature of adding/removing rows to the project, and the user could choose from a soundbank which sound(s) they want to add. This could enable the user to create highly customisable drum patterns, with control over different parameters of each sound.


## Status
This project is complete. A live version has been created (see below) using PHP. This allows you to register an account, login, and share patterns using the "social" button. You can also view and customise other people's creations.

The updated PHP files will be uploaded soon.

## Live Demo  

Live version is up and running!
[http://lgacode.co.uk/drumslog](https://lgacode.co.uk/drumslog/)

You can still demo the GitHub offline environment here:
[https://default-la.github.io/DrumSlog/](https://default-la.github.io/DrumSlog/)

## Screenshots

![screenshot](https://raw.githubusercontent.com/default-LA/DrumSlog/master/assets/img/ds1.png)

![screenshot](https://raw.githubusercontent.com/default-LA/DrumSlog/master/assets/img/ds2.png)



## Features

* Fully programmable step sequencer  
* The ability to add and remove sequencer rows  
* Individual volume control on each row  
* A sound select popup menu, showing drum/sound categories for the user to browse  
* In-menu sound previews when clicked  
* 442 different samples to choose from  
* BPM control  
* Random and Random+ features  
* "Stepper" feature  


## How To Use

**PLAY/STOP** - Plays the current sequence  
**BPM UP/DOWN** - Increases and decreases the tempo of the sequence  
**ADD NEW** - Adds a new row to the project (maximum of 10)  
**Remove Row** (⛔) - Removes the selected row from the project  
**CLEAR** - Clears all active steps from the sequence  
**RANDOM** - Randomises drum pattern with selected sounds  
**RANDOM+** - Randomises drum pattern and sound selection  
**STEPPER** - Randomises the step sequence order  
**MUTE** - Mutes the selected row  
**SOLO** - Mutes all rows except selected  

To change the sound of a row, click the name of the sound in the red LED display of the row, or if it is a new row, click "NO SOUND SELETED". This will launch a popup menu which allows you to browse a sound to insert. When you have found a sound you like click OKAY.


## Known Issues / Bugs

As it currently stands, the project runs perfectly in most browsers, except for Google Chrome running on Linux. I have stripped down the code to it's core (just a loop with sounds), and it still has trouble keeping a constant tempo, which makes me think it may be an issue with Chromes ability to run JS with audio when running in a Linux environent. I welcome any optimisation suggestions!  



## Future Improvements

* When SOLO is active, the user should be able to click the same SOLO button again, and changes should revert.  
* The STEPPER function will be more complex, which will variate the BPM of each step. This should hopefully create lovely glitchy effects!  
* Each row should have Left/Right control, and playback speed/pitch control  
* Master volume control
* Eventually the project will support a new/save/load/delete project functionality, so that users can save a project for the future.  
* The ability to upload your own sounds and download the users sequence in a playable audio format may be implemented. 


