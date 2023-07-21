const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;

var corda, corda2;
var chao;
var fruta, frutaImg;
var cleber, cleberImg, clebertrstImg, clebercmdImg, cleberpscndImg;
var str, strImg;

var fundo;

var link;

var butao;

var blln;

var comerSom, cortaSom, sadSom, msc, arSom;

var mute;

var score;

function preload() {
  fundo = loadImage("images/background.png");

  cleberImg = loadImage("images/rabbit1.png");
  frutaImg = loadImage("images/melon.png");

  clebertrstImg = loadAnimation("images/sad_2.png", "images/sad_3.png");

  clebercmdImg = loadAnimation(
    "images/eat.png",
    "images/eat_2.png",
    "images/eat_3.png",
    "images/eat_4.png"
  );

  strImg = loadImage("images/star.png");

  cleberpscndImg = loadAnimation(
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit1.png",
    "images/rabbit2.png",
    "images/rabbit3.png",
    "images/rabbit1.png",
    "images/rabbit1.png"
  );

  clebercmdImg.looping = false;
  clebertrstImg.looping = false;

  comerSom = loadSound("sounds/eating_sound.mp3");
  cortaSom = loadSound("sounds/rope_cut.mp3");
  sadSom = loadSound("sounds/sad.wav");
  arSom = loadSound("sounds/air.wav");
  msc = loadSound("sounds/sound1.mp3");
}

function setup() {
  createCanvas(500, 700);
  engine = Engine.create();
  world = engine.world;

  msc.play();
  msc.setVolume(0.3);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  chao = Bodies.rectangle(250, 690, 500, 30, { isStatic: true });
  World.add(world, chao);

  corda = new Rope(6, { x: 250, y: 30 });

  fruta = Bodies.circle(250, 350, 20, 20);
  Composite.add(corda.body, fruta);

  link = new Link(corda, fruta);

  cleberpscndImg.frameDelay = 5;
  clebercmdImg.frameDelay = 10;
  clebertrstImg.frameDelay = 15;

  cleber = createSprite(400, 550, 20, 20);
  cleber.addAnimation("olho", cleberpscndImg);
  cleber.addAnimation("come", clebercmdImg);
  cleber.addAnimation("lgrm", clebertrstImg);
  cleber.scale = 0.35;

  butao = createImg("images/cut_btn.png");
  butao.position(200, 20);
  butao.size(100, 115);

  butao.mouseClicked(drop);

  blln = createImg("images/balloon.png");
  blln.position(330, 210);
  blln.size(130, 100);

  blln.mouseClicked(blow);

  mute = createImg("images/mute.png");
  mute.position(425, 20);
  mute.size(50, 50);

  mute.mouseClicked(mutar);

  str = createSprite(120, 225);
  str.addImage(strImg);
  str.scale = 0.15;
}

function draw() {
  background(50);
  Engine.update(engine);

  image(fundo, 250, 350, 500, 700);

  corda.show();

  if (fruta != null) {
    image(frutaImg, fruta.position.x, fruta.position.y, 90, 90);
  }

  if (fruta != null && fruta.position.y >= 650) {
    cleber.changeAnimation("lgrm");
    sadSom.play();
    fruta = null;
  }

  if (cllsn(fruta, cleber) == true) {
    cleber.changeAnimation("come");
    comerSom.play();
  }

  cllsn2(fruta, str);

  text(mouseX + "," + mouseY, mouseX, mouseY);
  //debug function

  drawSprites();
}

function drop() {
  corda.break();
  link.break();
  cortaSom.play();
}

function cllsn(body, sprite) {
  if (body != null) {
    var distance = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    if (distance <= 80) {
      World.remove(world, fruta);
      fruta = null;
      return true;
    } else {
      return false;
    }
  }
}

function blow() {
  if (fruta.position.y > 220 && fruta.position.y < 280) {
    Matter.Body.applyForce(fruta, { x: 0, y: 0 }, { x: -0.03, y: 0 });
    arSom.play();
    arSom.setVolume(0.4);
  }
}

function mutar() {
  if (msc.isPlaying()) {
    msc.stop();
  } else {
    msc.play();
  }
}

function cllsn2(body, sprite) {
  if (body != null) {
    var distance = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    if (distance <= 50) {
      str.destroy();
      score += 1;
    }
  }
}
