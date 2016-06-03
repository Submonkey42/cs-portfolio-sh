window.onerror = function(msg, url, line) {
    alert("Window error: " + msg + ", " + url + ", line " + line);
};


var mycanvas = document.getElementById("mycanvas");
var ctx = mycanvas.getContext("2d");
var bullets = [];
var enemies = [];
var enemiesSP1 = [];
var BULLETSPD = 3;
var ENEMYSPD = 2;
var ENEMYSP1SPD = 4;
var bulletImg = document.getElementById("bulletImg");
var bombImg = document.getElementById("bombImg");
var oceanImg = document.getElementById("oceanImg");
var gameOverImg = document.getElementById("gameOverImg");
var retryImg = document.getElementById("retryImg");
var skullImg = document.getElementById("skullImg");
var zeroImg = document.getElementById("zeroImg");
var bgY = 0;
var bgspd = .5;
var score = 0;
var boxAlive = true;
var EnemySP1_Spawnrate = 0;
var gamePaused = false;





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
        
        for(i=0;i<enemies.length;i++) {
           if(this.xPos < enemies[i].xPos + enemies[i].width && this.xPos + this.width > enemies[i].xPos && this.yPos < enemies[i].yPos + enemies[i].width && this.yPos + this.width > enemies[i].yPos && boxAlive) {
                box.hp = box.hp-100;
                enemies.splice(i,1);
            }            
        }
        
        
        for(i=0;i<enemiesSP1.length;i++) {
           if(this.xPos < enemiesSP1[i].xPos + enemiesSP1[i].width && this.xPos + this.width > enemiesSP1[i].xPos && this.yPos < enemiesSP1[i].yPos + enemiesSP1[i].width && this.yPos + this.width > enemiesSP1[i].yPos && boxAlive) {
                box.hp = box.hp-100;
                enemiesSP1.splice(i,1);
           }
        }
        
        if(box.hp<=0) {
            boxAlive = false;
            ctx.drawImage(gameOverImg, 100, 256);
          //  ctx.drawImage(retryImg, 215, 406);
          retryButton.style.display = "initial";
        }
        


        if (box.goLeft && box.xPos > 0) {
            box.xPos = box.xPos - 3;
        }
        if (box.goRight && box.xPos < 490) {
            box.xPos += 3;
        }
        if (box.goUp && box.yPos > 0) {
            box.yPos -= 3;
        }
        if (box.goDown && box.yPos < 490) {
            box.yPos += 3;
        }
        
        
        if (boxAlive==false && box.yPos <490) {
            box.yPos +=1;
        }
        
    },
    shoot: function(){
        if (box.shootDefault && box.canShoot) {
            bullets.push( new Bullet(box.xPos, box.yPos) );
            box.canShoot = false;
            setTimeout(function(){
                box.canShoot = true}, 430);
        }
    },
    
    draw: function() {
                if(boxAlive==false) {
            ctx.fillStyle = "#FF0000"
        ctx.beginPath();
            ctx.fillRect(box.xPos,box.yPos,this.width,this.height);
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


 

    this.draw = function(){
        // ctx.rect(this.xPos+5, this.yPos, 10, 10);
        // ctx.stroke();
        ctx.drawImage(bulletImg, this.xPos-5, this.yPos)
    }

     this.move = function(){
       this.yPos -= BULLETSPD;
       
       for(i=0;i<enemies.length;i++) {
           if(this.xPos < enemies[i].xPos + enemies[i].width && this.xPos + this.width > enemies[i].xPos && this.yPos < enemies[i].yPos + enemies[i].width && this.yPos + this.width > enemies[i].yPos) {
                enemies.splice(i,1);
                score = score+100;
           }
        }
        
        for(i=0;i<enemiesSP1.length;i++) {
           if(this.xPos < enemiesSP1[i].xPos + enemiesSP1[i].width && this.xPos + this.width > enemiesSP1[i].xPos && this.yPos < enemiesSP1[i].yPos + enemiesSP1[i].width && this.yPos + this.width > enemiesSP1[i].yPos) {
                enemiesSP1.splice(i,1);
                score = score+500;
           }
        }
       
    }

}    



function Enemy(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 20;
    this.height = 20;
    this.health = 1;
    
    this.draw = function(){
        ctx.rect(this.xPos, this.yPos, 20, 20);
        ctx.stroke();
    }
    this.move = function(){
        this.yPos += ENEMYSPD;
        
        for(i=0;i<bullets.length;i++) {
           if(this.xPos < bullets[i].xPos + bullets[i].width && this.xPos + this.width > bullets[i].xPos && this.yPos < bullets[i].yPos + bullets[i].width && this.yPos + this.width > bullets[i].yPos) {
          //      bullets.splice(i,1);
           }
        }
    };
}
    
    
function EnemySP1(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 18;
    this.height = 18;
    this.health = 1;
    
    this.draw = function(){
        ctx.fillStyle="#00FF00";
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, 18, 18);
        ctx.fillRect(this.xPos, this.yPos, 18, 18);
        ctx.stroke();
        ctx.closePath();

    };
    this.move = function(){
        this.yPos +=ENEMYSP1SPD;
        
        for(i=0;i<bullets.length;i++) {
           if(this.xPos < bullets[i].xPos + bullets[i].width && this.xPos + this.width > bullets[i].xPos && this.yPos < bullets[i].yPos + bullets[i].width && this.yPos + this.width > bullets[i].yPos) {
            //    bullets.splice(i,1);
           }
        }
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



var displayHP = setInterval(function(){
    document.getElementById("health").innerHTML = "Health: "+box.hp;
},0); 

var displayScore = setInterval(function() {
    document.getElementById("score").innerHTML = "Score: "+score;
},0);
    
//var displaySpawn = setInterval(function() {
  //  document.getElementById("spawn").innerHTML = "Spawn: "+EnemySP1_Spawnrate;
//},0)    



//      CONTROLS
//     | | | | |
//     v v v v v



document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 37 && boxAlive
    ) {
        box.goLeft = true;
    }
    if (evt.keyCode === 38 && boxAlive
    ) {
        box.goUp = true;
    }
    if (evt.keyCode === 39 && boxAlive
    ) {
        box.goRight = true;
    }
    if (evt.keyCode === 40 && boxAlive
    ) {
        box.goDown = true;
    }
    if (evt.keyCode === 32 && boxAlive
    ) {
        box.shootDefault = true;
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


function keyDown(e) {
    if (e.keyCode===80) pauseGame();
}

var game = setTimeout(gameLoop, 1000 / 30);
function pauseGame() {
  if (!gamePaused) {
    game = clearTimeout(game);
    gamePaused = true;
  } else if (gamePaused) {
    game = setTimeout(gameLoop, 1000 / 30);
    gamePaused = false;
  }
}


function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    box.move();
    box.draw();
    box.shoot();
    
//    ctx.drawImage(oceanImg,0,bgY)




    EnemySP1_Spawnrate = Math.floor((Math.random()*50+1));


    
    if(bullets.length > 0 && bullets[0]["yPos"] < 0) {
        bullets.shift();   
    };

    if(enemies.length > 0 && enemies[0].yPos > 500) {
        enemies.shift();
    }
    
    
     
    
    
    
    for(var i =0; i<bullets.length; i++){
        bullets[i].move();
        bullets[i].draw();
    }
    
    for(var i =0; i<enemies.length; i++){
        enemies[i].move();
        enemies[i].draw();

    }
    
    for(var i =0; i<enemiesSP1.length; i++){
        enemiesSP1[i].move();
        enemiesSP1[i].draw();
        
    }

    window.requestAnimationFrame(gameLoop);
}
gameLoop();


var wave1 = setInterval(function(){
    enemies.push(new Enemy(Math.random() * mycanvas.width-20, 0));
}, 500);

var waveSP = setInterval(function(){
    if(EnemySP1_Spawnrate==10){
    enemiesSP1.push(new EnemySP1(Math.random() * mycanvas.width-20, 0));
    }
},100);








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

