// JavaScript File
var secret = "3838404037393739666513";
var input="";
var timer;
var secretsound = new Audio('LTTP_Secret.mp3','LTTP_Secret.ogg');
var bombsound = new Audio('LTTP_Bomb_Blow.mp3','LTTP_Bomb_Blow.ogg')
var close = true;
var door = document.getElementById("doorclosed.jpg");
var explode = document.getElementById("blank.jpg");
var doordiv = document.getElementById("doorblock")




function bombplay(){
    setTimeout(secretplay,500)
    bombsound.play();
}

function secretplay(){
    secretsound.play();
}

function doorfinish(){
    doordiv.style.display = "none";
}

function check_input() {

    //code for secret
    if(input == secret){
    door = document.getElementById("doorpic")
     bombplay();
    door.src = "dooropen.jpg"
    
    explode = document.getElementById("boom")

    explode.style.display = "initial";
    explode.src = "LTTP_Explosion.gif"


    
     }
    }

$(document).keyup(function(e) {
    input += e.which
    clearTimeout(timer);
    timer = setTimeout(function() {input = ""; }, 1000);
    check_input();
});

