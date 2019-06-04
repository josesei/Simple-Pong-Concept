"use strict";

class Ball {
  constructor(x, y, radius, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }
};

class Paddle {
  constructor(x, y, width, heigth) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = heigth;
  }
};

class Player {
  constructor(score) {
    this.score = score;
  }
};

  var game = {
    startingConditions: {

      paddle1Y: 20,
      paddle2Y: 768,
      paddleX: Math.floor((800-200)/2),
      ballX: Math.floor(800/2),
      ballY: Math.floor(800/2)
  
    },

    needPosReset: false,
    needPointsResetPlayer1: false,
    needPointsResetPlayer2: false,
  };

  (function gameLogic (){
  
    function keyDownHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = true;
      }
      else if(e.keyCode == 37) {
          leftPressed = true;
      }
  }
  
  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = false;
      }
      else if(e.keyCode == 37) {
          leftPressed = false;
      }
  }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  
    const frame = document.getElementById("pong");
    const context = frame.getContext("2d");

    function clearCanvas(){
      context.clearRect(0, 0, 800, 800);
    }

    function renderBall(ball){
      context.beginPath();
      context.arc(Math.floor(ball.x),Math.floor(ball.y),ball.radius,0,Math.PI*2,false);
      context.closePath();
      context.fill();
    }

    function renderPaddle(paddle){
      context.fillStyle = "#FFFFFF";
      context.fillRect(Math.floor(paddle.x), Math.floor(paddle.y) , paddle.width , paddle.height);

    }

    function renderElements(ball, paddle1, paddle2){
      renderPaddle(paddle1);
      renderPaddle(paddle2);
      renderBall(ball);
    }

    function detectCollision(ball, paddle1, paddle2, player1, player2, game){
      if(ball.x>=800-ball.radius || ball.x-ball.radius<=0){
        ball.velocityX=ball.velocityX*-1;
      }
      if(ball.y-ball.radius<=paddle1.y+paddle1.height&&ball.y-ball.radius>paddle1.y+paddle1.height-6){
        if((ball.x>=paddle1.x-ball.radius&&ball.x<=paddle1.x+paddle1.width+ball.radius)){
          ball.velocityY=ball.velocityY*-1;
        }
      }
      else if(ball.y+ball.radius>=paddle2.y&&ball.y+ball.radius<paddle2.y+6){
        if((ball.x>=paddle2.x-ball.radius&&ball.x<=paddle2.x+paddle2.width+ball.radius)){
          ball.velocityY=ball.velocityY*-1;
        }
      }
      if(ball.y>=850 || ball.y<=-50){
        if(ball.y>=850){
          ++player1.score;
        }
        else{
          ++player2.score;
        }
        game.needPosReset=true;
      }
  
    }

    function  updatePositions(ball, paddle1, paddle2){
      let paddleVelocity = 0;

      if(rightPressed){
        paddleVelocity = 225;
        if(leftPressed){
          paddleVelocity = 0;
        }
      }
      else if(leftPressed){
        paddleVelocity = -225;
      }

      if(paddle1.x >= 0 && paddle1.x <= 800-paddle1.width || paddle1.x<0 && ball.velocityX>0 || paddle1.x>800-paddle1.width && ball.velocityX<0){
        paddle1.x = paddle1.x + ball.velocityX * (Math.random()*0.3+0.3)  * 0.016;
      }
      if(paddle2.x >= 0 && paddle2.x <= 800-paddle2.width || paddle2.x<0 && paddleVelocity>0 || paddle2.x>800-paddle2.width && paddleVelocity<0){
        paddle2.x = paddle2.x + paddleVelocity * 0.016;
      }
      ball.x = ball.x + ball.velocityX*0.016;
      ball.y = ball.y + ball.velocityY*0.016;
    }


    var rightPressed = false;
    var leftPressed = false;
    var player1 = new Player(0);
    var player2 = new Player(0);
    var paddle1 = new Paddle(game.startingConditions.paddleX, game.startingConditions.paddle1Y, 200, 12);
    var paddle2 = new Paddle(game.startingConditions.paddleX, game.startingConditions.paddle2Y, 200, 12);
    var ball = new Ball(game.startingConditions.ballX, game.startingConditions.ballY, 9, 250, 125);  

    setInterval(function(){      
      if(game.needScoreReset){
        game.points = 0;
      }
      if(game.needPosReset){
        game.needPosReset=false;
        ball.velocityX= 250;
        ball.velocityY= 125;
        ball.x = game.startingConditions.ballX;
        ball.y = game.startingConditions.ballY;
    }
    clearCanvas();
    detectCollision(ball, paddle1, paddle2, player1, player2, game);
    updatePositions(ball, paddle1, paddle2);
    renderElements(ball, paddle1, paddle2);}
    , 16);
  
    
  

  })();


//Coded by José Ignacio Carbone