window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.addEventListener('resize', resizeCanvas, false);
var canvas = document.getElementById('canvas');
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


}
//

var offsetX =0;
var offsetY =250;
var zoom = 4;
var timer = 0;
var running = 0;
var gravity = 0.6 / zoom;
var gravityDirection =  1;
var falling,next;
var hero = {
    angle: 30,
    speed: 0,
    acceleration: 0,
    scaleX: 1,
    scaleY: 0,
    x: 50,
    y: 250,
    w: 10,
    velocityX: 0,
    velocityY: 0,
    moving: false,
    jump: false,
    fly: false
}

var leftPress = false;
var rightPress = false;

document.addEventListener("keyup", function (event) {

    if (event.keyCode == 37){
        leftPress = false;
        if(rightPress){
        hero.scaleX = 1;
        }

    }
    if(event.keyCode ==39){
        rightPress = false;
        if(leftPress){
        hero.scaleX = -1;
        }
    }
    if(!(rightPress || leftPress)){
        hero.moving = false;
        hero.acceleration = 0;
        hero.speed = 0;
    }
});
document.addEventListener("keydown", function (event) {
    //left
    if (event.keyCode == 37) {
        if (hero.scaleX == 1) {
            hero.acceleration = 0;
        }
        hero.scaleX = -1;
        hero.acceleration = 0.2 /zoom;
        hero.moving = true;
        leftPress = true;
    }
    //up
    if (event.keyCode == 38) {
        if (!hero.jump && !hero.fly) {
            hero.velocityY = -10/zoom * gravityDirection;
            hero.jump = true;
        }
    }
    //right
    if (event.keyCode == 39) {

        if (hero.scaleX == -1) {
            hero.acceleration = 0;
        }
        hero.scaleX = 1;

        hero.acceleration = 0.2 / zoom;
        hero.moving = true;
        rightPress = true;

    }
    if (event.keyCode == 32) {
        gravityDirection *= -1;
        hero.jump = false;

    }
    return false;
});

var gameOver = function(type){
    alert("gameOver");
    gravityDirection = 1;
    hero = {
        angle: 30,
        speed: 0,
        acceleration: 0,
        scaleX: 1,
        scaleY: 0,
        x: 320,
        y: 330,
        w: 10,
        velocityX: 0,
        velocityY: 0,
        moving: false,
        jump: false,
        fly: false
    }
}

var size ={x: 23/2, y:15/2};
var ctx = document.getElementById('canvas').getContext('2d');
var fly = true;
var correctY = null;
var i = 0;
var j=0;
var box;
var hatOffset;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    i = Math.round(hero.x / size.x);
    j = Math.floor((hero.y) / size.y);
    if (hero.jump) {
        next =  Math.ceil((hero.velocityY + gravity * gravityDirection)/size.y);
        if(next == 0){

            next = (hero.velocityY + gravity * gravityDirection > 0)? 1: -1;
        }
        falling = gravityDirection ==1?  hero.velocityY>0 :  hero.velocityY<0;
        if (map[j+next][i] != " " && falling)  {
            if(map[j+next][i] == "H"){
                gameOver();
            }
            hero.velocityY =0;
            hero.jump = false;
            hero.fly = false;

        }
        else if  (map[j-gravityDirection][i] != " " && !falling){
            hero.velocityY = 0;
            hero.y = j*size.y;
            hero.jump = false;
            hero.fly = false;
            if(map[j-gravityDirection][i] == "H"){
                gameOver();
            }

        }
        else {

            hero.y = hero.y + hero.velocityY;
            hero.velocityY += gravity * gravityDirection;
        }
    }
    else {
        next =  Math.ceil((hero.velocityY + gravity * gravityDirection)/size.y);
        if(next == 0){
            next = (hero.velocityY + gravity * gravityDirection > 0)? 1: -1;
        }
        if (map[j+next][i] != " ") {
            //if(hero.fly || hero.)
            hero.fly = false;
            hero.jump = false;

            hero.y  = j * size.y;
            hero.velocityY = 0;
            if(map[j+next][i] == "H"){
                gameOver();
            }

        }
        else {

            hero.fly = true;
            hero.y = hero.y + hero.velocityY;
            hero.velocityY += gravity * gravityDirection;
        }



    }

    if (hero.moving) {

        hero.speed = hero.speed + hero.acceleration;
        if (hero.speed > size.x/2/zoom) {
            hero.speed = size.x/2/zoom;

        }

        hero.velocityX = hero.speed * hero.scaleX;
        //hero.velocityY = hero.speed + hero.scaleY;
    }
    else {
        if (!hero.jump) {
            hero.velocityX = hero.velocityX / 1.25;
            if (hero.velocityX * hero.velocityX < 0.01) {
                hero.velocityX = 0;
            }
        }

    }
    // hero.x = hero.x + hero.velocityX;

    i = Math.round(hero.x / size.x);

    if(map[j][i+hero.scaleX] != " "){

        hero.velocityX =0;
        hero.x = i*size.x;


    }
    hero.x =  hero.x + hero.velocityX ;


    if((window.innerWidth*0.75) < (hero.x*zoom + offsetX)){
        offsetX -= 5;
    }
    if((window.innerWidth*0.25) > (hero.x*zoom  + offsetX)){
        offsetX += 5;
    }

    if((window.innerHeight*0.65) < (hero.y*zoom + offsetY)){
        offsetY -= 10;
    }
    if((window.innerHeight*0.35) > (hero.y*zoom  + offsetY)) {
        offsetY += 10;
    }

    minX = Math.floor(-offsetX / size.x/zoom) -2;
    //minX = 0;
    if(minX < 0) minX = 0;
    minY = Math.floor(-offsetY / size.y/zoom) -2;
    //minY = 0;
    if(minY < 0) minY = 0;
    maxX = minX + window.innerWidth / size.x/zoom +3;
    if(maxX >= map[0].length)
        maxX = map[0].length -1;
    maxY = minY+ window.innerHeight / size.y/zoom +3;
    if(maxY >= map.length)
        maxY = map.length -1;
    ctx.fillStyle = "rgb(50,50,50)";
    for (var y = minY; y < maxY; y++) {
        for (var x = minX; x < maxX; x++) {
            if (map[y][x] != " ") {
                if(map[y][x] == "#"){
                    ctx.fillStyle = "rgb(50,50,50)";
                }
                else{
                    ctx.fillStyle = "rgb(255, 0, 0)";
                }
                ctx.fillRect(x * size.x*zoom + offsetX, y * size.y*zoom + offsetY, size.x*zoom, size.y*zoom);
            }

        }
    }
    ctx.fillStyle = "rgb(200,0,150)";

    timer++;
    if(timer == 12){
        timer = 0;
        running = (running + 1) % 2;
    }
    if(!hero.moving){
        running = 0;
    }
    left = (hero.scaleX < 0)? 1: 0;
    up = (gravityDirection < 0)? 1 : 0;

    ctx.drawImage(dataCanvas, left* 64,up*30 + running * 60, 64, 30, hero.x*zoom + offsetX, hero.y *zoom + offsetY, 64, 30) ;

    ctx.fillStyle = "rgb(0,0,0)";

    requestAnimFrame(function () {
        animate();
    });
}
resizeCanvas();
animate();