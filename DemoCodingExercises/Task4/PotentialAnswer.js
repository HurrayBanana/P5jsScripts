function setup() {
  createCanvas(350, 400);
  textFont("monospace",16)
  gap = textWidth("x");
}

let message = "Hello and welcome to the demo @@@@@@@@@@@@@@@@ this may get a bit wobbly     ";
let p = 0;
let delay = 0;
function logicSimple(){
  delay++;
  if (delay % 10 == 0)
  {
    p++
    if (p == message.length)
      p = 0;
  }
}

function draw() {
  background(200);
  logicSimple();
  let m = segment(message, p,30);
  drawmessageSimple(m,0,150);
  waveMessage(m,0,200);
}
let gap = 0;
function drawmessageSimple(t, x, y){
  for (let i = 0; i < t.length; i++){
    xpos = x + i * gap
    ypos = y
    text(t.substring(i,i+1), xpos, ypos);
  }
}

function segment(t, start, width) {
  tt = t.substring(start,start+width);
  l = tt.length;
  if (l < width)
    tt += t.substring(0, width - l);
  return tt;
}

let angle = 0;
function waveMessage(t, x, y){
  angle += 0.015;

  for (let i = 0; i < t.length; i++){
    xpos = x + i * 10;
    ypos = y+80*sin(angle+xpos/100);
    
    text(t.substring(i,i+1), xpos, ypos);
  }
}
