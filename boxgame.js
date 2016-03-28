var mycanvas = document.getElementById("mycanvas");
var ctx = mycanvas.getContext("2d");
var bullets = [];
var enemies = [];
var BULLETSPD = 6;
var ENEMYSPD = 4;
var bulletImg = document.getElementById("bulletImg")
var bombImg = document.getElementById("bombImg")

function isColliding(thing1, thing2){
    
var isLeft = thing2.xpos+thing2.width<thing1.xPos
var isRight = thing2.xPos>thing1.xPos+thing1.width
var isBelow = thing2.yPos+thing2.height<thing1.yPos
var isAbove = thing2.yPos>thing1.yPos+thing1.height

return !(isRight || isLeft || isAbove || isBelow);

}

var box = {
    xPos: 20,
    yPos: 50,
    height: 20,
    width: 20,
    goLeft: false,
    goRight: false,
    goUp: false,
    goDown: false,
    shootDefault: false,
    canShoot: true,
    
    move: function() {

        if (box.goLeft && box.xPos > 0) {
            box.xPos = box.xPos - 5;
        }
        if (box.goRight && box.xPos < 480) {
            box.xPos += 5;
        }
        if (box.goUp && box.yPos > 0) {
            box.yPos -= 5;
        }
        if (box.goDown && box.yPos < 480) {
            box.yPos += 5;
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
    }

    

}

function Enemy(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 20;
    this.height = 20;
    
    this.draw = function(){
        ctx.rect(this.xPos, this.yPos, 20, 20);
        ctx.stroke();
    }
    this.move = function(){
        this.yPos += ENEMYSPD;
    }

}

document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 37 //||
    ) {
        box.goLeft = true;
    }
    if (evt.keyCode === 38 
    ) {
        box.goUp = true;
    }
    if (evt.keyCode === 39 
    ) {
        box.goRight = true;
    }
    if (evt.keyCode === 40
    ) {
        box.goDown = true;
    }
    if (evt.keyCode === 32) {
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

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    box.move();
    box.draw();
    box.shoot();
    
    if(Bullet.yPos < 10) {
        Bullet.draw = null;
        
    }
    if(Enemy.yPos > 390) {
        Enemy.draw = null;
    }
    
    for(var i =0; i<bullets.length; i++){
        bullets[i].move()
        bullets[i].draw()
    }
    
    for(var e =0; e<enemies.length; e++){
        enemies[e].move()
        enemies[e].draw()

    }
    

    window.requestAnimationFrame(gameLoop);
}
gameLoop();


var wave1 = setInterval(function(){
    enemies.push(new Enemy(Math.random() * mycanvas.width-20, 0));
}, 3000);


