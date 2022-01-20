function setup() {
  createCanvas(400, 400);
  textFont("monospace",16)
  gap = textWidth("x");
  messageWidth = width/gap + 1; //calculation of number of characters
}

let messageWidth = 30; //space to store number of characters to show

function draw() {
  background(200);
  logicSimple();
  let m = segment(message, p,messageWidth); // update of segment call to use new variable for width
  drawmessageSimple(m,0-pixelOffset,150);
  waveMessage(m,0-pixelOffset,200);
}
