// JavaScript File

var arduinoImage = document.getElementById("arduinoImage");

var b1on= false;
var b2on= false;
var buzzer= new Audio('buzzer.wav');


function button0() {
    b2on=false;
    buzzer.loop=false;
            if(b1on == false){
    arduinoImage.src = "arduino_default.jpg";
        }
        
        if(b1on){
    arduinoImage.src = "arduino_button_1.jpg";
    }
        
}


function button1() {
    b1on = !b1on;
    
        if(b1on == false){
    arduinoImage.src = "arduino_default.jpg";
        }
        
        if(b1on){
    arduinoImage.src = "arduino_button_1.jpg";
    }
        
}


function button2() {
    arduinoImage.src = "arduino_button_2.jpg";
    b2on=true;
        if(b1on&&b2on){
    arduinoImage.src = "arduino_button_1_and_2.jpg";
    buzzer.play();
    buzzer.loop=true;
    }
}




