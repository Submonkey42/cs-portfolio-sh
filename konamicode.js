// JavaScript File
var secret = "3838404037393739666513";
var input="";
var timer;
var secretsound = new Audio('LTTP_Secret.mp3','LTTP_Secret.ogg');
var bombsound = new Audio('LTTP_Bomb_Blow.mp3','LTTP_Bomb_Blow.ogg')
var close = true;
var img = document.getElementById("doorclosed.jpg");

function bombplay(){
    setTimeout(secretplay,500)
    bombsound.play();
}

function secretplay(){
    secretsound.play();
}



function check_input() {

    //code for secret
    if(input == secret){
    img = document.getElementById("doorpic")
     bombplay();
    img.src = "dooropen.jpg"

     }
    }

$(document).keyup(function(e) {
    input += e.which
    clearTimeout(timer);
    timer = setTimeout(function() {input = ""; }, 1000);
    check_input();
});

function doortoggle(){
    
   
    
}
