var spawnThatMonkey , monkey_running;

var banana ,bananaImage, bananaGroup;

var obstacle, obstacleImage, obstacleGroup;

var ground, groundImage, movingGround;

var SurvivalTime=0;
var Score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 400);  
  
  spawnThatMonkey=createSprite(60, 300, 30, 30);
  spawnThatMonkey.addAnimation("monkey_running", monkey_running);
  spawnThatMonkey.scale=0.15;
  
  ground=createSprite(300, 375, 600, 60);
  ground.velocityX=-5;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
}

function draw() {
  background(0, 255, 255);
  
  if (ground.x < 500) {
   ground.x=300; 
  }
  
  stroke("black");
  SurvivalTime = Math.round(frameCount);
  text("Survival Time: "+SurvivalTime, 450, 50);
  
  stroke("red");  
  text("Score: "+Score, 450, 80);
  
  spawnBananas();
  spawnObstacles();
  
  if (keyDown("SPACE") && spawnThatMonkey.y >=200) {
   spawnThatMonkey.velocityY=-5; 
  }
  
  if (spawnThatMonkey.y < 400) {
   spawnThatMonkey.velocityY=spawnThatMonkey.velocityY+0.5; 
  }
  
  if (spawnThatMonkey.isTouching(bananaGroup)) {
    Score=Score+1;
    bananaGroup.destroyEach();
  }
  
  if (obstacleGroup.isTouching(spawnThatMonkey)) {
    gameEnd();
    
    obstacleGroup.velocityX=0;
    bananaGroup.velocityX=0;
  }
  
  spawnThatMonkey.collide(ground);
  
  drawSprites();
  
}

function spawnBananas() {
 
  if (frameCount %80 ===0) {
    //banana.y = Math.round(random(120, 200));
    banana = createSprite(600, Math.round(random(120, 200)), 30, 30);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-4;
    //banana.velocityY=2;
    banana.lifetime=160;
    
    bananaGroup.add(banana);
    }
}

function spawnObstacles() {
  
  if (frameCount %300 ===0) {
  
  obstacle = createSprite(600, Math.round(random(300, 400)), 50, 50);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.3;
  obstacle.velocityX=-4;
  obstacle.lifetime=160;
  
  obstacleGroup.add(obstacle);
  }
}

function gameEnd() {
  
  bananaGroup.velocityX=0;
  obstacleGroup.velocityX=0;
  
}

