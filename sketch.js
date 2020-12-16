var Ghost, ghostImage;
var tower, towerImage;
var climberGroup,doorGroup,climberImage,doorImage;
var END = 0
var PLAY = 1;
var gameState = PLAY;
var Gameover;





function preload()
{
  ghostImage = loadAnimation("ghost-standing.png","ghost-jumping.png");
  towerImage = loadImage("tower.png");
  climberImage = loadImage("climber.png");
  doorImage = loadImage("door.png");
  
  
  
  
}

function setup()
{
  createCanvas(600,600)
  
  tower = createSprite(300,300,600,600)
  tower.addImage("animation", towerImage);
  tower.velocityY = 4;
  tower.y = tower.height/2;
  tower.scale = 1.2
  
  
  Ghost = createSprite(300,300,10,10);
  Ghost.addAnimation("anim", ghostImage)
  Ghost.scale = 0.5;
  Ghost.setCollider("circle",0,0,139)
  Ghost.debug = false;
  
  
  
  
  climberGroup = new Group();
  doorGroup = new Group();
  
  
  
}

function draw()
{
  
  background("black")
  
  
  if(gameState === PLAY)
  {
    
  Ghost.bounceOff(doorGroup);
    
    if(tower.y > 600)
    {
      tower.y = 200;
    }
  
    if(keyDown("space"))
    {
      Ghost.velocityY = -12;
    }
    
    if(keyDown("RIGHT_ARROW"))
    {
      Ghost.velocityX = 4;
    }
    
    if(keyDown("LEFT_ARROW"))
    {
      Ghost.velocityX = -4;
    }
  
    Ghost.velocityY = Ghost.velocityY +1;
    
    if(climberGroup.isTouching(Ghost))
    {
     gameState = END;
    }
  
 
  
    spawnDoor();
    spawnClimber();  
  }
  
  else if(gameState === END)
  {
    
    
    
    
    tower.velocityY = 0;
    Ghost.velocityY = 0;
    Ghost.velocityX = 0;
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    
    tower.visible = false;
    climberGroup.destroyEach();
    doorGroup.destroyEach(); 
    Ghost.visble = false;
    
    textSize(50);
    text("You Lose",300,300);
  }
  
  
  drawSprites();
}

function spawnClimber()
{
 
  
  if(frameCount %60 === 0)
  {
    var climb = createSprite(Math.round (random(20,580)),550,10,10)
    climb.addImage("img",climberImage)
    climb.velocityY = -4;
    climberGroup.add(climb);
  }                  
 
  
}

function spawnDoor()
{
  if(frameCount %60 === 0)
  {
    var dor = createSprite(Math.round (random(20,580)),100,10,10)
    dor.addImage("imgg",doorImage);
    dor.velocityY = 4;
    doorGroup.add(dor);
  }

}

