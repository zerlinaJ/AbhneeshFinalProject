class Form {

  constructor() {
   this.background = createSprite(windowWidth/2,windowHeight/2)       
   
   this.backgroundImage = loadImage("images/TitlePageBackground1.jpg")
   this.background.addImage(this.backgroundImage)
   this.background.scale = 0.35;
   this.title = createSprite(windowWidth/2 - 100,90);
   this.play = createSprite(windowWidth/2 - 100,windowHeight/2 -50)
   this.titleImage = loadImage("images/titleimage.png")
   this.title.addImage(this.titleImage)
   this.playImage = loadImage("images/startbutton.png")
   this.play.addImage(this.playImage)                          
  }
  hide(){
   
  }

  display(){
  



















    
  

   
  }
}
