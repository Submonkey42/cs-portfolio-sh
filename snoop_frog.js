// JavaScript File
var secret = "837879798070827971";
var input="";
var timer;



function check_input() {

    //code for secret
    if(input == secret){
    window.location.("snoop_frog.html");
     }
    }
    
$(document).keyup(function(e) {
    input += e.which
    clearTimeout(timer);
    timer = setTimeout(function() {input = ""; }, 2000);
    check_input();
});