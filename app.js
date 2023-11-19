"use strict";
var gameStart = null;
var gameSpeed = null;
var gameArea = null;
var gameAreaContext = null;
var gameAreaWidth = 0;
var gameAreaHeight = 0;
var cell = 0;
var playerScore = 0;
var snake = null;
var snakeFood= null;
var snakeDirection = null;
var speedSize = 0;
var timer = null;

function initialize(){

    gameStart= document.querySelector("#gameStart");
    gameSpeed= document.querySelector("#gameSpeed");
    gameArea= document.querySelector("#gameArea");

    gameAreaContext = gameArea.getContext("2d");

    gameAreaWidth = 400;
    gameAreaHeight = 600;

    cell = 20;

    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;

   // gameStart.onclick = () => this.disabled = true;

 gameStart.onclick = function(){ 
    this.disabled = true;
    document.body.classList.add('no-scroll');
    startGame();
};
}

    function startGame(){

        playerScore=0;
        snakeDirection="right";
        speedSize= parseInt(gameSpeed.value);

        if(speedSize > 9){
            speedSize = 9;
        }else if(speedSize < 0){
            speedSize = 1;
        }

        snake = [];
        console.log("snake: " + snake);
        snake.push({ x:0 , y: cell})
        console.log("snake.puxh(" + cell + ")");


    

    createFood();
    clearInterval(timer);
    timer = setInterval(createGameArea, 500 /speedSize);

}

function createFood(){

    snakeFood = { 
        x: Math.round((Math.random() * (gameAreaWidth - cell)) /cell),
        y: Math.round((Math.random() * (gameAreaHeight - cell)) /cell),
    }
}

function createGameArea(){

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

gameAreaContext.fillStyle= "#FFFFFF";
gameAreaContext.fillRect(0,0,gameAreaWidth,gameAreaHeight);
gameAreaContext.strokeStyle="#CCCCCC";
gameAreaContext.strokeRect(0,0,gameAreaWidth,gameAreaHeight);



if(snakeDirection == 'right'){
    snakeX++;

}else if(snakeDirection == 'left'){
    snakeX--;
    
}else if(snakeDirection == 'down'){
    snakeY++;

}else if(snakeDirection == 'up'){
    snakeY--;
}

// Check if the snake hits the left wall
if (snakeX < 0) {
    snakeX = gameAreaWidth / cell - 1;
}
// Check if the snake hits the right wall
else if (snakeX == gameAreaWidth / cell) {
    snakeX = 0;
}

// ... (rest of the code)

// Check if the snake hits the top wall
if (snakeY < 0) {
    snakeY = gameAreaHeight / cell - 1;
}
// Check if the snake hits the bottom wall
else if (snakeY == gameAreaHeight / cell) {
    snakeY = 0;
}

if(snakeX == -1 ||  snakeX == gameAreaWidth / cell || 
snakeY == -1 || snakeY == gameAreaHeight / cell || control(snakeX, snakeY, snake))
{
    writeScore();
    document.body.classList.remove('no-scroll');

    clearInterval(timer);
    gameStart.disabled = false;
    return;
}

if(snakeX==snakeFood.x && snakeY== snakeFood.y){

    var newHead = {x: snakeX, y: snakeY};
    playerScore += speedSize;
    createFood();

}else{

    var newHead = snake.pop();
    newHead.x = snakeX;
    newHead.y = snakeY;

}
snake.unshift(newHead); 
for(var i = 0; i < snake.length; i++) {
    createSquare(snake[i].x,snake[i].y)
}
    createSquare(snakeFood.x, snakeFood.y);
    

    
}

function control(x,y, array ){

for(var i = 0; i <array.length; i++ ){

    if(array[i].x == x && array[i].y == y) 
    return true;

}

    return false;
}

function writeScore(){

    gameAreaContext.font="58px sans-serif";
     gameAreaContext.fillStyle="#FFF333";
gameAreaContext.fillText(
"score: " + playerScore,
gameAreaWidth /2 -100,
 gameAreaWidth /2
)

    
}

function createSquare(x,y){

gameAreaContext.fillStyle = "#000000";
gameAreaContext.fillRect(x * cell, y * cell, cell, cell)

    
}
function changeDirection(e){

    var keys = e.which;
    if(keys == "40" && snakeDirection !="up")snakeDirection="down";
    else if(keys == "39" && snakeDirection !="left")snakeDirection="right";
    else if(keys == "38" && snakeDirection !="down")snakeDirection="up";
    else if(keys == "37" && snakeDirection !="right")snakeDirection="left";
}

window.onkeydown = changeDirection;
window.onload= initialize;