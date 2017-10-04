window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};


var mycanvas = document.getElementById("mycanvas");
var ctx = mycanvas.getContext("2d");
var bullets = [];
var enemies = [];
var enemiesSP1 = [];
var enemiesSP2 = [];
var BULLETSPD = 6;
var ENEMYSPD = 4;
var ENEMYSP1SPD = 8;
var ENEMYSP2SPD = 4;
var bulletImg = document.getElementById("bulletImg");
var bombImg = document.getElementById("bombImg");
var gameOverImg = document.getElementById("gameOverImg");
var skullImg = document.getElementById("skullImg");
var zeroImg = document.getElementById("zeroImg");
var bgY = 0;
var bgspd = 1;
var score = 0;
var boxAlive = true;
var EnemySP1_Spawnrate = 0;
var EnemySP2_Spawnrate = 0;
var gameRun = false;
var menuRun = true;

var hpbar = document.getElementById("hpbar");
var hpf = document.getElementById("hpf");
var hp24 = document.getElementById("hp24");
var hp23 = document.getElementById("hp23");
var hp22 = document.getElementById("hp22");
var hp21 = document.getElementById("hp21");
var hp20 = document.getElementById("hp20");
var hp19 = document.getElementById("hp19");
var hp18 = document.getElementById("hp18");
var hp17 = document.getElementById("hp17");
var hp16 = document.getElementById("hp16");
var hp15 = document.getElementById("hp15");
var hp14 = document.getElementById("hp14");
var hp13 = document.getElementById("hp13");
var hp12 = document.getElementById("hp12");
var hp11 = document.getElementById("hp11");
var hp10 = document.getElementById("hp10");
var hp9 = document.getElementById("hp9");
var hp8 = document.getElementById("hp8");
var hp7 = document.getElementById("hp7");
var hp6 = document.getElementById("hp6");
var hp5 = document.getElementById("hp5");
var hp4 = document.getElementById("hp4");
var hp3 = document.getElementById("hp3");
var hp2 = document.getElementById("hp2");
var hp1 = document.getElementById("hp1");
var hp0 = document.getElementById("hp0");



var introSound = new Audio ('introSound.ogg');



//      GAME OBJECTS
//      | | | | | | 
//      v v v v v v


var box = {
    xPos: 256,
    yPos: 480,
    height: 20,
    width: 20,
    goLeft: false,
    goRight: false,
    goUp: false,
    goDown: false,
    shootDefault: false,
    canShoot: true,
    hp: 2500,



    move: function() {

        //Detection for ship and all enemies.
        for (i = 0; i < enemies.length; i++) {
            if (this.xPos < enemies[i].xPos + enemies[i].width && this.xPos + this.width > enemies[i].xPos && this.yPos < enemies[i].yPos + enemies[i].width && this.yPos + this.width > enemies[i].yPos && boxAlive) {
                box.hp = box.hp - 100;
                enemies.splice(i, 1);
            }
        }


        for (i = 0; i < enemiesSP1.length; i++) {
            if (this.xPos < enemiesSP1[i].xPos + enemiesSP1[i].width && this.xPos + this.width > enemiesSP1[i].xPos && this.yPos < enemiesSP1[i].yPos + enemiesSP1[i].width && this.yPos + this.width > enemiesSP1[i].yPos && boxAlive) {
                box.hp = box.hp - 100;
                enemiesSP1.splice(i, 1);
            }
        }


        for (i = 0; i < enemiesSP2.length; i++) {
            if (this.xPos < enemiesSP2[i].xPos + enemiesSP2[i].width && this.xPos + this.width > enemiesSP2[i].xPos && this.yPos < enemiesSP2[i].yPos + enemiesSP2[i].width && this.yPos + this.width > enemiesSP2[i].yPos && boxAlive) {
                box.hp = box.hp - 100;
                enemiesSP2.splice(i, 1);
            }
        }
        //Detection for bullets with basic enemies.
                for (i = 0; i < bullets.length; i++) {
            for(k = 0; k < enemies.length; k++) {
            if (enemies[k].xPos < bullets[i].xPos + bullets[i].width && enemies[k].xPos + enemies[k].width > bullets[i].xPos && enemies[k].yPos < bullets[i].yPos + bullets[i].width && enemies[k].yPos + enemies[k].width > bullets[i].yPos) {
                enemies[k].hp = enemies[k].hp - 1;
                score = score + 100;
                if (enemies[k].hp == 0) {
                    enemies.splice(k, 1);
                }
                k--;
                bullets.splice(i, 1);
                break;
            }
            }
        }
        //Detection for bullets with Special enemy 1.
                for (i = 0; i < bullets.length; i++) {
            for(k = 0; k < enemiesSP1.length; k++) {
            if (enemiesSP1[k].xPos < bullets[i].xPos + bullets[i].width && enemiesSP1[k].xPos + enemiesSP1[k].width > bullets[i].xPos && enemiesSP1[k].yPos < bullets[i].yPos + bullets[i].width && enemiesSP1[k].yPos + enemiesSP1[k].width > bullets[i].yPos) {
                enemiesSP1[k].hp = enemiesSP1[k].hp - 1;
                score = score + 500;
                if (enemiesSP1[k].hp == 0) {
                    enemiesSP1.splice(k, 1);
                }
                k--;
                bullets.splice(i, 1);
                break;
            }
            }
        }
        //Detection for bullets with Special enemy 2.
                for (i = 0; i < bullets.length; i++) {
            for(k = 0; k < enemiesSP2.length; k++) {
            if (enemiesSP2[k].xPos < bullets[i].xPos + bullets[i].width && enemiesSP2[k].xPos + enemiesSP2[k].width > bullets[i].xPos && enemiesSP2[k].yPos < bullets[i].yPos + bullets[i].width && enemiesSP2[k].yPos + enemiesSP2[k].width > bullets[i].yPos) {
                enemiesSP2[k].hp = enemiesSP2[k].hp - 1;
                score = score + 500;
                if (enemiesSP2[k].hp == 0) {
                    enemiesSP2.splice(k, 1);
                }
                k--;
                bullets.splice(i, 1);
                break;
            }
            }
        }
        




        if (box.goLeft && box.xPos > 0) {
            box.xPos = box.xPos - 6;
        }
        if (box.goRight && box.xPos < 490) {
            box.xPos += 6;
        }
        if (box.goUp && box.yPos > 0) {
            box.yPos -= 6;
        }
        if (box.goDown && box.yPos < 475) {
            box.yPos += 6;
        }


        if (boxAlive == false && box.yPos < 475) {
            box.yPos += 2;
        }

    },
    shoot: function() {
        if (box.shootDefault && box.canShoot) {
            bullets.push(new Bullet(box.xPos, box.yPos));
            box.canShoot = false;
            setTimeout(function() {
                box.canShoot = true;
            }, 430);
        }
    },

    draw: function() {
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(box.xPos, box.yPos, this.width, this.height);
        ctx.rect(box.xPos, box.yPos, this.width, this.height);
        ctx.stroke();
        
        if (boxAlive == false) {
            ctx.fillStyle = "#FF0000";
            ctx.beginPath();
            ctx.fillRect(box.xPos, box.yPos, this.width, this.height);
            ctx.closePath();
            ctx.fill();
            box.canShoot = false;
            }


    }
};



function Bullet(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 8;
    this.height = 8;
    this.remove = false;




    this.draw = function() {
        // ctx.rect(this.xPos+5, this.yPos, 10, 10);
        // ctx.stroke();
        ctx.drawImage(bulletImg, this.xPos - 5, this.yPos)
    }

    this.move = function() {
        this.yPos -= BULLETSPD;

    }

}



function Enemy(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 20;
    this.height = 20;
    this.hp = 1;



    this.draw = function() {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, 20, 20);
        ctx.fillRect(this.xPos, this.yPos, 20, 20);
        ctx.stroke();
        ctx.closePath();
    }
    this.move = function() {
        this.yPos += ENEMYSPD;


    };
}


function EnemySP1(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 18;
    this.height = 18;
    this.hp = 1;



    this.draw = function() {
        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, 18, 18);
        ctx.fillRect(this.xPos, this.yPos, 18, 18);
        ctx.stroke();
        ctx.closePath();
    };
    this.move = function() {
        this.yPos += ENEMYSP1SPD;


    };
}



function EnemySP2(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 25;
    this.height = 25;
    this.hp = 3;



    this.draw = function() {
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, 25, 25);
        ctx.fillRect(this.xPos, this.yPos, 25, 25);
        ctx.stroke();
        ctx.closePath();

    };
    this.move = function() {
        this.yPos += ENEMYSP2SPD;


    };
}
/////////////////////////////////////////










//     SOUND
//   | | | | |
//   v v v v v
function introPlay(){
    introSound.play();
}




//    function background() {
//      bgY -= bgspd;
//     if(bgY == -1*mycanvas.height) {
//        bgY = 0;
//   }
//}

//      DISPLAY STUFF      
//      | | | | | | |      
//      v v v v v v v      



// var displayHP = setInterval(function() {
//     document.getElementById("health").innerHTML = "Health: " + box.hp;
// }, 0);

// var displayScore = setInterval(function() {
//     document.getElementById("score").innerHTML = "Score: " + score;
// }, 0);

// var displayVar1 = setInterval(function() {
//  document.getElementById("var1").innerHTML = "menuRun: "+menuRun;
// },0)    

// var displayVar2 = setInterval(function() {
//  document.getElementById("var2").innerHTML = "gameRun: "+gameRun;
// },0)

function hud() {
    ctx.rect(0, 500, 532, 532);
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(0, 500, 532, 532);
    
    ctx.fillStyle = "#000000";
    ctx.font = "bold 10px press_start_2pregular";
    ctx.fillText("Health", 3, 520);
    
    ctx.fillStyle = "#000000";
    ctx.fillText(score, 430, 540);
    ctx.fillText("Score", 430, 520)
}

var hpbarX = -36;
var hpbarY = 400;

function healthbar(){
    ctx.drawImage(hpbar,hpbarX ,hpbarY);
    
    if(box.hp === 2500){
    ctx.drawImage(hpf, hpbarX, hpbarY);   
    }
    if(box.hp === 2400){
    ctx.drawImage(hp24, hpbarX, hpbarY);    
    }
    if(box.hp === 2300){
    ctx.drawImage(hp23, hpbarX, hpbarY);    
    }
    if(box.hp === 2200){
    ctx.drawImage(hp22, hpbarX, hpbarY);    
    }
    if(box.hp === 2100){
    ctx.drawImage(hp21, hpbarX, hpbarY);    
    }
    if(box.hp === 2000){
    ctx.drawImage(hp20, hpbarX, hpbarY);    
    }
    if(box.hp === 1900){
    ctx.drawImage(hp19, hpbarX, hpbarY);    
    }
    if(box.hp === 1800){
    ctx.drawImage(hp18, hpbarX, hpbarY);    
    }
    if(box.hp === 1700){
    ctx.drawImage(hp17, hpbarX, hpbarY);    
    }
    if(box.hp === 1600){
    ctx.drawImage(hp16, hpbarX, hpbarY);    
    }
    if(box.hp === 1500){
    ctx.drawImage(hp15, hpbarX, hpbarY);    
    }
    if(box.hp === 1400){
    ctx.drawImage(hp14, hpbarX, hpbarY);    
    }
    if(box.hp === 1300){
    ctx.drawImage(hp13, hpbarX, hpbarY);    
    }
    if(box.hp === 1200){
    ctx.drawImage(hp12, hpbarX, hpbarY);    
    }
    if(box.hp === 1100){
    ctx.drawImage(hp11, hpbarX, hpbarY);    
    }
    if(box.hp === 1000){
    ctx.drawImage(hp10, hpbarX, hpbarY);    
    }
    if(box.hp === 900){
    ctx.drawImage(hp9, hpbarX, hpbarY);    
    }
    if(box.hp === 800){
    ctx.drawImage(hp8, hpbarX, hpbarY);    
    }
    if(box.hp === 700){
    ctx.drawImage(hp7, hpbarX, hpbarY);    
    }
    if(box.hp === 600){
    ctx.drawImage(hp6, hpbarX, hpbarY);    
    }
    if(box.hp === 500){
    ctx.drawImage(hp5, hpbarX, hpbarY);    
    }
    if(box.hp === 400){
    ctx.drawImage(hp4, hpbarX, hpbarY);    
    }
    if(box.hp === 300){
    ctx.drawImage(hp3, hpbarX, hpbarY);    
    }
    if(box.hp === 200){
    ctx.drawImage(hp2, hpbarX, hpbarY);    
    }
    if(box.hp === 100){
    ctx.drawImage(hp1, hpbarX, hpbarY);    
    }
    if(box.hp === 0){
    ctx.drawImage(hp0, hpbarX, hpbarY);    
    }
}







//      CONTROLS
//     | | | | |
//     v v v v v



document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 37 && boxAlive) {
        box.goLeft = true;
    }
    if (evt.keyCode === 38 && boxAlive) {
        box.goUp = true;
    }
    if (evt.keyCode === 39 && boxAlive) {
        box.goRight = true;
    }
    if (evt.keyCode === 40 && boxAlive) {
        box.goDown = true;
    }
    if (evt.keyCode === 32 && boxAlive) {
        box.shootDefault = true;
    }
    if(evt.keyCode === 82 && boxAlive === false) {
        //window.location.href=window.location.href;
        score = 0;
        boxAlive = true;
        EnemySP1_Spawnrate = 0;
        EnemySP2_Spawnrate = 0;
        gameRun = false;
        menuRun = true;
        
        box.xPos = 256;
        box.yPos = 480;
        box.height = 20;
        box.width = 20;
        box.goLeft = false;
        box.goRight = false;
        box.goUp = false;
        box.goDown = false;
        box.shootDefault = false;
        box.canShoot = true;
        box.hp = 2500;

    }
    if (evt.keyCode === 80 && boxAlive && menuRun === false) {
        pauseScr();
        gameRun = !gameRun;
        if (gameRun) {
            gameLoop();
        }
    }
    if(evt.keyCode >= 0 && menuRun){
        gameRun = true;
        menuRun = false;
        
        if(menuRun) {
            menuLoop();
        }
        if (gameRun) {
            gameLoop();
        }
    }
});




document.addEventListener("keyup", function(evt) {
    if (evt.keyCode === 37 //|| evt.keyCode === 65
    ) {
        box.goLeft = false;
    }
    if (evt.keyCode === 38 //|| evt.keyCode === 87
    ) {
        box.goUp = false;
    }
    if (evt.keyCode === 39 //|| evt.keyCode === 68
    ) {
        box.goRight = false;
    }
    if (evt.keyCode === 40 //|| evt.keyCode === 83
    ) {
        box.goDown = false;
    }
    if (evt.keyCode === 32) {
        box.shootDefault = false;
    }
});

//  BUTTONS
//  | | | |
//  v v v v

        


//    MENU
//   | | | |
//   v v v v


function menuMain(){
        // ctx.font = "50px press_start_2pregular";
        // ctx.fillText("BOXGAME",90, 70);
        ctx.drawImage(document.getElementById("title"), 35, 70);
        ctx.font = '20px press_start_2pregular';
        ctx.fillText("Press Any Key to Start", 40, 400);
} 




function menuLoop() {
        ctx.beginPath();
        ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
        menuMain();
        
        
        if(menuRun){
        window.requestAnimationFrame(menuLoop);
        
    }
}
////////////////////////////

function pauseScr() {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.font = "40px press_start_2pregular";
    ctx.fillText("Paused", 140, 230);
    
    window.requestAnimationFrame(pauseScr);
}

////////////////////////////

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    
    box.move();
    box.draw();
    box.shoot();
    

    
    menuRun=false;





    EnemySP1_Spawnrate = Math.floor((Math.random() * 50 + 1));
    EnemySP2_Spawnrate = Math.floor((Math.random() * 50 + 1));



    if (bullets.length > 0 && bullets[0]["yPos"] < 0) {
        bullets.shift();
    }

    if (enemies.length > 0 && enemies[0].yPos > 500) {
        enemies.shift();
    }
    
    if (enemiesSP1.length > 0 && enemiesSP1[0].yPos > 500) {
        enemiesSP1.shift();
    }
    
    if (enemiesSP2.length > 0 && enemiesSP2[0].yPos > 500) {
        enemiesSP2.shift();
    }





    for (var i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].draw();
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].move();
        enemies[i].draw();

    }

    for (var i = 0; i < enemiesSP1.length; i++) {
        enemiesSP1[i].move();
        enemiesSP1[i].draw();

    }

    for (var i = 0; i < enemiesSP2.length; i++) {
        enemiesSP2[i].move();
        enemiesSP2[i].draw();
    }


    for (i = 0; i < bullets.length; i++) {
        if (bullets[i].remove) {
            bullets.splice(i, 1);
        }
    }
    
    hud();
    healthbar();
    
    if (box.hp <= 0) {
    boxAlive = false;
        ctx.drawImage(gameOverImg, 100, 256);
        ctx.drawImage(skullImg, 205, 522);
        ctx.fillStyle = "#000000";
        ctx.font = '20px press_start_2pregular';
        ctx.fillText("Press R to Retry", 110, 400); 
    }



    if (gameRun) {
        window.requestAnimationFrame(gameLoop);
    }


}

if(menuRun){
menuLoop();
}



if(gameRun){
gameLoop();
}

var wave1 = setInterval(function() {
    if (gameRun) {
        enemies.push(new Enemy(Math.random() * mycanvas.width - 20, 0));
    }
}, 500);


var waveSP1 = setInterval(function() {
    if (gameRun) {
        if (EnemySP1_Spawnrate == 42) {
            enemiesSP1.push(new EnemySP1(Math.random() * mycanvas.width - 20, 0));
        }
    }
}, 100);


var waveSP2 = setInterval(function() {
    if (gameRun) {
        if (EnemySP2_Spawnrate == 42) {
            enemiesSP2.push(new EnemySP2(Math.random() * mycanvas.width - 20, 0));
        }
    }
}, 100);









//Display xPos and yPos
// var displayPos = true

//   function showPosition(event) {
//     var x = event.clientX;
//     var y = event.clientY;
//     var coords = "X: " + x + "\n" + ", Y: " + y;
//     document.getElementById("demo").innerHTML = coords;
// }





// if(displayPos==true) {
//   showPosition(event)
//     }
