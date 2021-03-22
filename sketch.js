var dogImg, happyDogImg, 
dog, database, foodS, foodStock, canvas, 
lastFed, fedTime, foodObj, feed, addFood, 
food1;

function preload() {
  dogImg = loadImage('Dog.png');
  happyDogImg = loadImage('happy dog.png');
 
}

function setup() {
  database = firebase.database();
  canvas = createCanvas(800, 400);

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  
  
  food1 = new Food();
  
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  addFood = createButton("Add food");
  addFood.position(370, 45);
  addFood.mousePressed(addFoods);

  input = createInput("Your Dog's Name");
  input.position(150, 70);

  feed = createButton("Feed your Dog");
  feed.position(450, 45);
  feed.mousePressed(feedDog);

  
}

function draw() {  
  background(46, 139, 87);

  food1.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })

fill(255,255,254)
  textSize(15)
if(lastFed>=12){
text("last Feed : " + lastFed % 12 + "PM",350,30)
}else if(lastFed==0){
  text("last Feed : 12 AM",350,30)
}else{
  text("last Feed : " + lastFed + "AM",350,30)
}


  drawSprites();
}
function readStock(data){
  foodS=data.val()
  food1.updateFoodStock(foodS)
}

function feedDog() {
  dog.addImage(happyDogImg)
  var foodStock_val = food1.getFoodStock();
  if(foodStock_val <=0){
    food1.updateFoodStock(foodStock_val * 0);

  }else{
      food1.updateFoodStock(foodStock_val -1 );
  }
  database.ref('/').update({
    Food:food1.getFoodStock(),
    FeedTime:hour()  })
}

function addFoods() {
 foodS++;
 database.ref('/').update({
   Food:foodS

 })
}