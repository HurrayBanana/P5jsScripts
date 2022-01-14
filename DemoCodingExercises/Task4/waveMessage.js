let angle = 0;
function waveMessage(t, x, y){
  angle += 0.001;

  for (let i = 0; i < t.length; i++){
    xpos = x + i * gap;
    ypos = y+100*sin(angle+xpos/5000);
    
    text(t.substring(i,i+1), xpos, ypos);
  }
}
