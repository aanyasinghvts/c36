var dog, dog1, happydogimg, database, foodS, foodStock, feedTime, lastFed, foodObj, feed, addFood, Bedroom, gardeN, Washroom;
var readState, sadDog;

function preload(){
  dog= loadImage("Dog.png");
  happydogimg= loadImage("Happy.png");
  Bedroom= loadImage("Bedroom.jpg");
  gardeN= loadImage("Garden.jpg");
  Washroom= loadImage("Wash room.png");
  sadDog= loadImage("deadDog.png");

}

function setup() {
  createCanvas(1000, 800);

  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog1=createSprite(500,400,250,250);
  dog1.addImage(dog);
  image(dog, 500, 400, 0, 0);
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState= database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val();
  });
}



function draw() {  
background(46,140,87);
 foodObj.display();

 text("foodStock");
 textSize(4);
 fill("white");
 stroke("white");
 
 if(lastFed>=12){
   text("Last Fed:"+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   text("Last Fed: 12 AM",350,30);
 }else{
   text("Last Fed: "+ lastFed + " AM", 350,30);
 }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happydogimg);

  foodObj.updatefoodStock(foodObj.getfoodStock(-1));
  database.ref('/').update({
    Food:foodObj.getfoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

 function update(state){
   database.ref('/').update({
     gameState:state
   });
 }
}