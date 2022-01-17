let pixelOffset = 0;
function logicSimple(){
  delay++;
  if (delay % 5 == 0)
  {
    pixelOffset+=0.5 //half a pixel move at a time
    if (pixelOffset > gap){
      pixelOffset = 0;
      p++
      if (p == message.length)
        p = 0;
    }
  }
}

function draw() {
  background(200);
  logicSimple();
  let m = segment(message, p,30);
  
  drawmessageSimple(m,0-pixelOffset,150);
  waveMessage(m,0-pixelOffset,200);
  
  text("gap",10,20);
}
