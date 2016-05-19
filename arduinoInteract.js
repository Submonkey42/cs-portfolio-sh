// JavaScript File
var b0= getElementById("arduino_default.jpg")
var b1= getElementById("arduino_button_1.jpg");
var b2= getElementById("arduino_button_2.jpg")
var b1and2= getElementById("arduino_button_1_and_2.jpg")


function button0() {
    nobutton = document.getElementById("arduinoImage")
    nobutton.src = "arduino_default.jpg"
}

function button1() {
    firstbutton = document.getElementById("arduinoImage")
    firstbutton.src = "arduino_button_1.jpg"
     button1offdiv.style.zIndex = "15";   

}

function button2() {
    secondbutton = document.getElementById("arduinoImage")
    secondbutton.src = "arduino_button_2.jpg"
}

function button1and2() {
    bothbuttons = document.getElementById("arduinoImage")
    bothbuttons.src = "arduino_button_1_and_2.jpg"
}


