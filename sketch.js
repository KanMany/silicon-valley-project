var bow,
  arrow,
  background,
  redB,
  pinkB,
  greenB,
  blueB,
  arrowGroup,
  redB,
  greenB,
  blueB,
  form,
  pinkB;
var bowImage,
  arrowImage,
  green_balloonImage,
  red_balloonImage,
  pink_balloonImage,
  blue_balloonImage,
  backgroundImage;

var gamestate = "ready";

function preload() {
  backgroundImage = loadImage("ground.png");

  arrowImage = loadImage("bullet.png");
  bowImage = loadImage("player.png");
  red_balloonImage = loadImage("zombie.png");
  green_balloonImage = loadImage("zombie1.png");
  pink_balloonImage = loadImage("zombie2.png");
  blue_balloonImage = loadImage("zombie3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //creating background
  background1 = createSprite(100, 100, windowWidth, windowHeight);
  background1.addImage(backgroundImage);
  background1.x = windowWidth / 2;
  background1.scale = 2.5;
  form = new Form();
  // creating bow to shoot arrow
  bow = createSprite(1200, 600, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 0.4;
  redB = new Group();
  greenB = new Group();
  blueB = new Group();
  pinkB = new Group();
  arrowGroup = new Group();
  score = 0;
}

function draw() {
  background("#666666");
  if (gamestate === "ready") {
    form.display();
  }
  if (gamestate === "play") {
    background1.velocityX = -3;
    if(pinkB.isTouching(bow)){
      score=score+5;
      pinkB.destroyEach();}
    if(redB.isTouching(bow)){
        score=score+5;
        redB.destroyEach();
      }
      if(blueB.isTouching(bow)){
        score=score+5;
        blueB.destroyEach();
      }
      if(greenB.isTouching(bow)){
        score=score+5;
        greenB.destroyEach();
      }
    
    if (background1.x < 0) {
      background1.x = background1.width / 2;
    }

    //moving bow
    bow.y = World.mouseY;

    // release arrow when space key is pressed
    if (keyDown("space")) {
      createArrow();
    }

    //creating continous enemies
    var select_balloon = Math.round(random(1, 4));

    if (World.frameCount % 200 == 0) {
      if (select_balloon == 1) {
        redBalloon();
      } else if (select_balloon == 2) {
        greenBalloon();
      } else if (select_balloon == 3) {
        blueBalloon();
      } else {
        pinkBalloon();
      }
    }

    drawSprites();
    scoring(redB);
    scoring(pinkB);
    scoring(greenB);
    scoring(blueB);
    textSize(30);
    stroke("white");
    fill("white");
    textFont("Calibri");
    text("Score: " + score, 500, 50);
  }
}

function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = Math.round(random(1,5));
  red.lifetime = 600;
  red.scale = 0.5;
  redB.add(red);
  return red;
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = Math.round(random(1,5));
  blue.lifetime = 600;
  blue.scale = 0.7;
  blueB.add(blue);
  return blue;
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = Math.round(random(1,5));
  green.lifetime = 600;
  green.scale = 0.4;
  greenB.add(green);
  return green;
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = Math.round(random(1,5));
  pink.lifetime = 600;
  pink.scale = 0.3;
  pinkB.add(pink);
  return pink;
}

function createArrow() {
  var arrow = createSprite(1100, 100, 60, 10);
  arrow.addImage(arrowImage);
  //arrow.x = 360;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 300;
  arrow.scale = 0.5;
  arrowGroup.add(arrow);
  score = score - 1;
  return arrow;
}
function scoring(baloon) {
  if (arrowGroup.isTouching(baloon)) {
    baloon.destroyEach();
    arrowGroup.destroyEach();
    score = score + 5;
  }
  return score;
}
