//Create variables here
var dog,dogImg,happyImg,gardenImg,bedImg,vaccinaton,living,washroom,foodS,foodStock
var fedTime,lastFed,feed,addFood,ing,bed;
var milk;

function preload()
{
	//load images here
dogImg=loadImage("images/dogImg.png")
happyImg=loadImage("images/dogImg1.png")
gardenImg=loadImage("images/Garden.png")
bedImg=loadImage("images/Bed Room.png")
vaccinaton=loadImage("images/dogVaccination.png")
living=loadImage("images/Living Room.png")
washroom=loadImage("images/Wash Room.png")

}

function setup() {
  database=firebase.database()
	createCanvas(500, 500);
  
  milk=new Food();

foodStock=database.ref("food")
foodStock.on("value",readStock)


dog=createSprite(300,400,150,150)
dog.addImage(dogImg)
dog.scale=0.15

feed=createButton("FEED THE DOG")
feed.position(360,95)
feed.mousePressed(feedDog)

addFood=createButton("ADD FOOD")
addFood.position(480,95)
addFood.mousePressed(addFoods)

ing=createButton("Garden")
ing.position(570,95)
ing.mousePressed(Garden)

bed=createButton("BedRoom")
bed.position(635,95)
bed.mousePressed(br)

}


function draw() {  
background("green")

milk.display()


drawSprites();

}



function readStock(data){
  foodS=data.val()
  milk.updateFoodStock(foodS)
  }
  
  function feedDog(){
    dog.x=300
dog.y=400
 dog.addImage(happyImg)
 dog.scale=0.15
milk.updateFoodStock(milk.getFoodStock()-1)
database.ref("/").update({
food:milk.getFoodStock(),
feedTime:hour()
})
  }


function addFoods(){
  dog.x=300
  dog.y=400
  dog.addImage(dogImg)
  dog.scale=0.15
  foodS++
  database.ref("/").update({
    food:foodS
  })
}
function Garden(){
  dog.x=250
  dog.y=250
  dog.addImage(gardenImg)
  dog.scale=0.7
}
function br(){
dog.x=250
dog.y=250
  dog.addImage(bedImg)
  dog.scale=0.7
}