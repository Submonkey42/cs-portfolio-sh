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
var ENEMYSP2SPD = 3.5;

var bulletImg = document.getElementById("bulletImg");
var bombImg = document.getElementById("bombImg");

var ocean_F1 = document.getElementById("oceanF1");
var ocean_F2 = document.getElementById("oceanF2");
var ocean_F3 = document.getElementById("oceanF3");
var ocean_F4 = document.getElementById("oceanF4");
var ocean_F5 = document.getElementById("oceanF5");
var ocean_F6 = document.getElementById("oceanF6");
var ocean_F7 = document.getElementById("oceanF7");
var ocean_F8 = document.getElementById("oceanF8");
var ocean_F9 = document.getElementById("oceanF9");
var ocean_F10 = document.getElementById("oceanF10");
var ocean_F11 = document.getElementById("oceanF11");
var ocean_F12 = document.getElementById("oceanF12");
var ocean_F13 = document.getElementById("oceanF13");
var ocean_F14 = document.getElementById("oceanF14");
var ocean_F15 = document.getElementById("oceanF15");
var ocean_F16 = document.getElementById("oceanF16");
var ocean_F17 = document.getElementById("oceanF17");
var ocean_F18 = document.getElementById("oceanF18");
var ocean_F19 = document.getElementById("oceanF19");
var ocean_F20 = document.getElementById("oceanF20");
var ocean_F21 = document.getElementById("oceanF21");
var ocean_F22 = document.getElementById("oceanF22");
var ocean_F23 = document.getElementById("oceanF23");
var ocean_F24 = document.getElementById("oceanF24");
var ocean_F25 = document.getElementById("oceanF25");
var ocean_F26 = document.getElementById("oceanF26");
var ocean_F27 = document.getElementById("oceanF27");
var ocean_F28 = document.getElementById("oceanF28");
var ocean_F29 = document.getElementById("oceanF29");
var ocean_F30 = document.getElementById("oceanF30");
var ocean_F31 = document.getElementById("oceanF31");
var ocean_F32 = document.getElementById("oceanF32");

var gameOverImg = document.getElementById("gameOverImg");
var retryImg = document.getElementById("retryImg");
var skullImg = document.getElementById("skullImg");
var zeroImg = document.getElementById("zeroImg");
var bgY = 0;
var bgspd = 1;
var score = 0;
var boxAlive = true;
var EnemySP1_Spawnrate = 0;
var EnemySP2_Spawnrate = 0;
var gameRun = true;

//      ANIMATIONS
//      | | | | |
//      v v v v v
var ocean = new Array();
ocean[0] = ocean_F1;
ocean[1] = ocean_F2;
ocean[2] = ocean_F3;
ocean[3] = ocean_F4;
ocean[4] = ocean_F5;
ocean[5] = ocean_F6;
ocean[6] = ocean_F7;
ocean[7] = ocean_F8;
ocean[8] = ocean_F9;
ocean[9] = ocean_F10;
ocean[10] = ocean_F11;
ocean[11] = ocean_F12;
ocean[12] = ocean_F13;
ocean[13] = ocean_F14;
ocean[14] = ocean_F15;
ocean[15] = ocean_F16;
ocean[16] = ocean_F17;
ocean[17] = ocean_F18;
ocean[18] = ocean_F19;
ocean[19] = ocean_F20;
ocean[20] = ocean_F21;
ocean[21] = ocean_F22;
ocean[22] = ocean_F23;
ocean[23] = ocean_F24;
ocean[24] = ocean_F25;
ocean[25] = ocean_F26;
ocean[26] = ocean_F27;
ocean[27] = ocean_F28;
ocean[28] = ocean_F29;
ocean[29] = ocean_F30;
ocean[30] = ocean_F31;
ocean[31] = ocean_F32;






//      GAME OBJECTS
//      | | | | | | 
//      v v v v v v


var box = {
    xPos: 256,
    yPos: 490,
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
                score = score + 500
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
                score = score + 500
                if (enemiesSP2[k].hp == 0) {
                    enemiesSP2.splice(k, 1);
                }
                k--;
                bullets.splice(i, 1);
                break;
            }
            }
        }
        
        if (box.hp <= 0) {
            boxAlive = false;
            ctx.drawImage(gameOverImg, 100, 256);
            //  ctx.drawImage(retryImg, 215, 406);
            retryButton.style.display = "initial";
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
        if (box.goDown && box.yPos < 490) {
            box.yPos += 6;
        }


        if (boxAlive == false && box.yPos < 490) {
            box.yPos += 2;
        }

    },
    shoot: function() {
        if (box.shootDefault && box.canShoot) {
            bullets.push(new Bullet(box.xPos, box.yPos));
            box.canShoot = false;
            setTimeout(function() {
                box.canShoot = true
            }, 430);
        }
    },

    draw: function() {
        if (boxAlive == false) {
            ctx.fillStyle = "#FF0000"
            ctx.beginPath();
            ctx.fillRect(box.xPos, box.yPos, this.width, this.height);
            ctx.closePath();
            ctx.fill();
        }
        ctx.rect(box.xPos, box.yPos, this.width, this.height);
        ctx.stroke();



    }
}



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

        // for (i = 0; i < enemies.length; i++) {
        //     if (this.xPos < enemies[i].xPos + enemies[i].width && this.xPos + this.width > enemies[i].xPos && this.yPos < enemies[i].yPos + enemies[i].width && this.yPos + this.width > enemies[i].yPos) {
        //         enemies[i].hp = enemies[i].hp - 1;
        //         score = score + 100;
        //         if (enemies[i].hp == 0) {
        //             enemies.splice(i, 1);
        //         }
        //     }
        // }

        // for (i = 0; i < enemiesSP1.length; i++) {
        //     if (this.xPos < enemiesSP1[i].xPos + enemiesSP1[i].width && this.xPos + this.width > enemiesSP1[i].xPos && this.yPos < enemiesSP1[i].yPos + enemiesSP1[i].width && this.yPos + this.width > enemiesSP1[i].yPos) {
        //         enemiesSP1[i].hp = enemiesSP1[i].hp - 1;
        //         score = score + 500;
        //         if (enemiesSP1[i].hp == 0) {
        //             enemiesSP1.splice(i, 1);
        //         }
        //     }
        // }

        // for (i = 0; i < enemiesSP2.length; i++) {
        //     if (this.xPos < enemiesSP2[i].xPos + enemiesSP2[i].width && this.xPos + this.width > enemiesSP2[i].xPos && this.yPos < enemiesSP2[i].yPos + enemiesSP2[i].width && this.yPos + this.width > enemiesSP2[i].yPos) {
        //         enemiesSP2[i].hp = enemiesSP2[i].hp - 1;
        //         score = score + 500;
        //         if (enemiesSP2[i].hp == 0) {
        //             enemiesSP2.splice(i, 1);
        //         }
        //     }
        // }

    }

}



function Enemy(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 20;
    this.height = 20;
    this.hp = 1;



    this.draw = function() {
        ctx.rect(this.xPos, this.yPos, 20, 20);
        ctx.stroke();
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








//    function background() {
//      bgY -= bgspd;
//     if(bgY == -1*mycanvas.height) {
//        bgY = 0;
//   }
//}

//      DISPLAY STUFF      
//      | | | | | | |      
//      v v v v v v v      



var displayHP = setInterval(function() {
    document.getElementById("health").innerHTML = "Health: " + box.hp;
}, 0);

var displayScore = setInterval(function() {
    document.getElementById("score").innerHTML = "Score: " + score;
}, 0);

//var displaySpawn = setInterval(function() {
//  document.getElementById("spawn").innerHTML = "Spawn: "+EnemySP1_Spawnrate;
//},0)    



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
    if (evt.keyCode === 80 && boxAlive) {
        gameRun = !gameRun;
        if (gameRun) {
            gameLoop()
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





function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    box.move();
    box.draw();
    box.shoot();

    //    ctx.drawImage(oceanImg,0,bgY)




    EnemySP1_Spawnrate = Math.floor((Math.random() * 50 + 1));
    EnemySP2_Spawnrate = Math.floor((Math.random() * 50 + 1));



    if (bullets.length > 0 && bullets[0]["yPos"] < 0) {
        bullets.shift();
    }

    if (enemies.length > 0 && enemies[0].yPos > 500) {
        enemies.shift();
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



    if (gameRun) {
        window.requestAnimationFrame(gameLoop);
    }


}
gameLoop();


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
