class Asteroid{
constructor(){
   
}
spawn(){
    if(score<5){

    
    if(frameCount%60 === 0){
        this.asteroid = createSprite(random(0,windowWidth),20)
this.asteroid.velocityY=4;
    if(this.asteroid.x>windowWidth/2){
        this.asteroid.velocityX = random(-1,-5)
    }
    else if(this.asteroid.x<windowWidth/2){
        this.asteroid.velocityX= random(1,5)
    }
    else {this.asteroid.velocityX=0;}

    rand1=Math.round(random(1,2))
    switch(rand1){
        case 1 : this.asteroid.addImage(asteroid1image)
        this.asteroid.scale = 0.35;
        asteroidsmallGroup.add(this.asteroid)
        break;
        case 2 : this.asteroid.addImage(asteroid2image)
        this.asteroid.scale = 0.7;
        asteroidmediumGroup.add(this.asteroid)
        break;

    }
    this.asteroid.lifetime=300;
}
    
    
}
else if(score>=5){
  
  flag=1;
}

if(flag===1){
    asteroidTitan.visible=true;
    asteroidTitan.addImage(asteroidTitanimage)
   // this.asteroidTitan.scale=0.6;
  asteroidTitan.velocityY= 0.5;
  asteroidTitan.lifetime = 20;
    asteroidsmallGroup.destroyEach();
    asteroidmediumGroup.destroyEach();
    flag=2;
 console.log("flag: " + flag)
 asteroidTitan.scale=asteroidTitan.scale+ 0.002;
 //flag=2;
}

}













}
