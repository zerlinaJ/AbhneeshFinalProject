var canvas, backgroundImage
var form
var distance = 0;
var gameState = "start" ;
var spaceBackground 
var spaceBackgroundImage,spaceBackgroundAnim;
var spaceship
var asteroid
var lives = 4;
var score = 0;
var lazer = null;
var  rand1;
var flag = 0;
var touchFlag = 0;
var visiblity = 255;
var frame = 0;

function preload(){
  //spaceBackgroundImage = loadImage("images/background1.png");
  spaceBackgroundAnim = loadAnimation("images/background1.png","images/background1.png","images/background2.png","images/background2.png",
  "images/background3.png","images/background3.png","images/background4.png","images/background4.png")
  healthbar0image = loadImage("images/0healthBar.png")
  healthbar1image = loadImage("images/1healthBar.png")
  healthbar2image = loadImage("images/2healthBars.png")
  healthbar3image = loadImage("images/3healthBars.png")
  asteroidTitanimage = loadImage("images/asteroid3.png")
spaceshipImage = loadImage("images/spaceship.png")
lazerImage = loadAnimation("images/laser1.png","images/laser2.png","images/laser3.png","images/laser4.png")

asteroid1image=loadImage("images/asteroid1.png")
asteroid2image=loadImage("images/asteroid2.png")
asteroid3image=loadImage("images/asteroid3.png")



}

function setup(){
  canvas = createCanvas(windowWidth , windowHeight);
asteroidsmallGroup = new Group()
asteroidmediumGroup = new Group()

   form = new Form();
 spaceBackground = createSprite(windowWidth/2,windowHeight/2);
 spaceBackground.addAnimation("background1image",spaceBackgroundAnim);
 spaceBackground.visible=false;
 spaceBackground.scale=1.5;

 asteroidTitan = createSprite(windowWidth/2,25)
asteroidTitan.visible=false;

 spaceship=createSprite(windowWidth/2,windowHeight-150);
 spaceship.addImage(spaceshipImage)
 spaceship.visible=false;
 spaceship.scale=0.4;

 healthbar =  createSprite(windowWidth-120,150);
 healthbar.addImage(healthbar3image);
 healthbar.visible=false;


}

 
 function draw(){
  //image(asteroid1image,200,200);
  if(gameState === "start"){
    console.log("Start")
  //  image(asteroid1image,200,200);
    form.play.visible=true;
    form.title.visible=true;

    asteroidTitan = createSprite(windowWidth/2,25)
    asteroidTitan.visible=false;

    score = 0;
    touchFlag=0;
    flag = 0;
 

    if(mousePressedOver(form.play)){
      gameState="play"
      console.log("gameState changed to play")
     
    }
  }

  



if(gameState=== "play"){
 
// background(spaceBackgroundImage);

  form.title.visible=false;
  form.play.visible=false;
  spaceBackground.visible=true;

  spaceship.visible=true;
  healthbar.visible=true;


if(keyDown("right")){
 spaceship.x=spaceship.x+8;
}
if(keyDown("left")){
  spaceship.x= spaceship.x-8;
}

asteroid=new Asteroid()
asteroid.spawn();

if(lazer){
originX=lerp(originX,targetx,0.2)
originY=lerp(originY,targety,0.2)
lazer.x = originX;
lazer.y = originY;


if(lazer.isTouching(asteroidmediumGroup)||lazer.isTouching(asteroidsmallGroup)){
 

  if(lazer.isTouching(asteroidsmallGroup)){
    score++;
    //console.log("asteroidsnapped")
   // asteroidGroup.destroyEach()
    //asteroidsmallGroup.setLifetimeEach(0)

   for(var i=0; i<asteroidsmallGroup.length;i++)
   {
     //  console.log(asteroidsmallGroup.get(i).x);
    
    if(asteroidsmallGroup.get(i).isTouching(lazer)){
    //  tint(255,visiblity);
      // /image(asteroid1image,asteroidsmallGroup.get(i).x,asteroidsmallGroup.get(i).y)
    //  asteroidsmallGroup.get(i).destroy();
      asteroidsmallGroup.get(i).lifetime = 0;
    lazer.lifetime=0;
     
    }
  }

  }
   if(lazer.isTouching(asteroidmediumGroup)){
    score++;
   // console.log("asteroidsnapped")
    //asteroidsmallGroup.destroyEach()
   // asteroidmediumGroup.setLifetimeEach(5)

   for(var i=0; i<asteroidmediumGroup.length;i++)
   {
     //  console.log(asteroidsmallGroup.get(i).x);

    if(asteroidmediumGroup.get(i).isTouching(lazer)){
    //  image(asteroid2image,asteroidmediumGroup.get(i).x,asteroidmediumGroup.get(i).y,500,500)
      asteroidmediumGroup.get(i).lifetime = 10;
      //asteroidmediumGroup.get(i).destroy();

      lazer.lifetime=0;
    }
  }
 }
}

if(lazer.collide(asteroidTitan)){
 
  lazer.lifetime = 0;
  touchFlag = 1;
 
  console.log(frame)
  score= score+1


if(touchFlag===1 && frame % 150 ===0){
  score = score + 100;
  gameState = "end"
}


}

}

 frame = frame +1; 

if(spaceship.isTouching(asteroidsmallGroup)|| spaceship.isTouching(asteroidmediumGroup) || spaceship.isTouching(asteroidTitan)){
  gameState="lostlife"
  console.log("collision")
}

document.addEventListener("click",fire,true)
}
if(gameState === "lostlife"){
  //asteroidGroup.destroyEach()
  
  asteroidsmallGroup.destroyEach()
  asteroidmediumGroup.destroyEach()
  lives=lives-1;
  switch(lives){
    case 2 : healthbar.addImage(healthbar2image);
    gameState = "play"
    break ;
    case 1: healthbar.addImage(healthbar1image);
    gameState="play"
    break;
    case 0 : healthbar.addImage(healthbar0image);
    gameState="end"
    break;
  }
  }
   if(gameState === "end"){
  background("black")
  textSize(45);
  fill("red");
  
  text("Press R to Restart",windowWidth/2-180,windowHeight/2)
  text("Score:" + score,windowWidth/2-180,windowHeight/2+100);
  if(keyDown("R")){
    gameState="start";
    lives=4;
    score=0;
    healthbar.addImage(healthbar3image);
    spaceBackground.visible=false;
    spaceship.visible=false;
    healthbar.visible=false;  
  }
}

else{
  drawSprites();
  textSize(30)
  fill("red")
  text("Score:" + score,windowWidth-150,75);
 }
}


function fire(e){  
  console.log(e)
  targetx = e.pageX ;
targety = e.pageY ;
lazer = createSprite(spaceship.x,spaceship.y);
lazer.addAnimation("fire",lazerImage)
lazer.scale = 0.4;
lazer.lifetime=25;
lazer.shapeColor = "red";
originX=spaceship.x;
originY=spaceship.y;

}



 
