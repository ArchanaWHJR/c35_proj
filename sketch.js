//Create variables here
var dog, happyDog, database, foodS, foodStock
function preload()
{
  dogImg =loadImage("images/dogImg.png");
  happyDogImg =loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog= createSprite(200,200,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3;
  foodStock =database.ref('food');
  foodStock.on("value",readStock,showError)
}


function draw() {  
background(46, 139, 87);

if(keyDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}
  drawSprites();
  textSize(20);
  fill("red")
  strokeWeight(4);
  stroke("blue")
  text("PRESS UP TO FEED DOG",150,400);
  text("Food Stock = "+ foodS + "  Bottles", 150,450);

}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
   food:x
 })
}
function showError(){
  console.log("database Error");
}


