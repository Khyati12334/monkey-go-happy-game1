  //VARIABLES
  var monkey , monkey_running,monkeyCollide;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  var score=0,bananasScore = 0;


function preload()
  {
  
    //UPLOADING ANIMATION
    monkey_running =          loadAnimation("sprite_0.png","sprite_2.png","sprite_3.png",
              "sprite_4.png","sprite_5.png","sprite_6.png",
              "sprite_7.png","sprite_8.png");
    
  //UPLOADING IMAGES
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

     
  //CREATING INVISIBLE GROUND
  invisiGround = createSprite(280,295,600,10);
    
  //TO MAKE THE GROUND INVISIBLE
  invisiGround.visible = false;
    
  }

function setup()
  {
  
  createCanvas(600,300);
    
  //CREATING GROUPS
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  //MONKEY SPRITE
  monkey = createSprite(80,260,10,10);
  monkey.addAnimation("moving",monkey_running); 
  monkey.scale = 0.1;
  
  //GROUND SPRITE
  ground = createSprite(280,295,600,10);
  ground.velocityX = -4;
    
  }

function draw()
  {
    
  //BACKGROUND COLOUR
  background ("skyblue");
    
  //CALLING BANANAS AND OBSTACLES FUNCTION
  bananas();
  obstacles();
  
  //TEXT OF SURVIVAL TIME
  fill("black");
  text("SURVIVAL TIME:"+score, 470,20);
  
  //TEXT OF BANANAS COLLECTED
  fill("black");
  text("BANANAS COLLECTED:"+bananasScore,310,20)
    
  //FOR SCORE SYSTEM
  score = score + Math.round(frameRate()/60);
      
  //FOR INFINITE GROUND
  ground.x = ground.width/2;
    
  //TO MAKE THE MONKEY JUMP USING SPACEBAR
  if(keyDown("space")&&monkey.y >= 235) 
  {
  monkey.velocityY = -15; 
  }

  //GIVING GRAVITY TO THE MONKEY
  monkey.velocityY = monkey.velocityY + 0.9;
   
  //TO MAKE THE MONKEY COLLIDE WITH THE INVISIBLE GROUND
  monkey.collide(invisiGround);
    
  //TO MAKE THE BANANA DISAPPEAR WHEN MONKEY TOUCHES THE BANANA
  if(monkey.isTouching(bananaGroup))
  {
  //TO DESTROY THE BANANA
  bananaGroup.destroyEach();
      
  //TO INCREASE BANANAS COLLECTED SCORE
  bananasScore++
  }
    
  //TO MAKE THE OBSTACLES AND BANANA DISAPPEAR WHEN MONKEY TOUCHES THEM
    if(monkey.isTouching(obstacleGroup))
  {
  //TO DESTROY OBSTACLES AND BANANAS
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
      
  //TO MAKE THE SCORES COME BACK AGAIN AT 0
  score = 0;
  bananasScore=0;
  }
    
  drawSprites();
  }



function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
    
  }


function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(300,280,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}





