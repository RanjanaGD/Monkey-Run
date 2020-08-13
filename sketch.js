
var backImage,backgr;

var monkey,monkey_running;

var ground,ground_img;

var bananaimg,bananaGroup;

var obstacle_img,obstacleGroup;

var score=0;



function preload(){
  backImage=loadImage("jungle2.jpg");
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimg=loadImage("banana.png");
  obstacle_img=loadImage("stone.png");
  
  
}

function setup() {
  createCanvas(800, 400);
  
  
  backgr=createSprite(0,0,400,800);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 
  
  monkey=createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  
  
  score=0;
}

function draw() {
  background(255);
  
  
  
  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(bananaGroup.isTouching(monkey)){
     score=score+2;
    bananaGroup.destroyEach();
     }
    
  switch(score){
      case 10:monkey.scale=0.12;
      break;
      case 20:monkey.scale=0.14;
      break;
      case 30:monkey.scale=0.16;
      break;
      case 40:monkey.scale=0.18;
      break;
      
      default:break;
      
  }
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  
  
  if(keyDown("space") ){
      monkey.velocityY = -12 ;
    }
  
   
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
  
  
  if(obstacleGroup.isTouching(monkey)){ 
        monkey.scale=0.05;     
  }
 
    
    spawnbanana();
     spawnobstacle();
  
    
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
}

function spawnbanana(){
  if(frameCount%80===0){
    var banana=createSprite(400,252,40,10);
    banana.y = random(175,120);
    banana.addImage( bananaimg);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=134;
    monkey.depth=banana.depth+1;
    
    bananaGroup.add(banana);
  }
}

function spawnobstacle(){
if(frameCount%300===0){
  var obstacle=createSprite(200,336,10,40);
  obstacle.velocityX = - 6;
  obstacle.addImage( obstacle_img);
  obstacle.lifetime=100;
  obstacle.scale = 0.12;
  monkey.depth=obstacle.depth+1;
  
  obstacleGroup.add(obstacle);
}
}

function reset(){  
  monkey.x=100;
  monkey.y=340;
  monkey.velocityX = 0;
  monkey.velocityY = 0; 
}