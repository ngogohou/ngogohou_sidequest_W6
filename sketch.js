const VIEW_W = 800;
const VIEW_H = 480;

let worldData;
let level;
let player;

let camX = 0;
let camY = 0;

function preload() {
  worldData = loadJSON("world.json");
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  level = new WorldLevel(worldData);

  const start = worldData.playerStart ?? { x: 1200, y: 800, speed: 1.8 };
  player = new Player(start.x, start.y, start.speed);

  camX = player.x - width / 2;
  camY = player.y - height / 2;
}

function draw() {
  player.updateInput();

  player.x = constrain(player.x, 0, level.w);
  player.y = constrain(player.y, 0, level.h);

  let targetX = player.x - width / 2;
  let targetY = player.y - height / 2;

  const maxCamX = max(0, level.w - width);
  const maxCamY = max(0, level.h - height);

  targetX = constrain(targetX, 0, maxCamX);
  targetY = constrain(targetY, 0, maxCamY);

  // slower, more reflective follow
  camX = lerp(camX, targetX, 0.04);
  camY = lerp(camY, targetY, 0.04);

  level.drawBackground();

  push();
  translate(-camX, -camY);
  level.drawWorld(player);
  player.draw();
  pop();
}
