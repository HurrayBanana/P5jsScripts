let delay = 0;
function logicSimple(){
  delay++;
  if (delay > 10)
  {
    delay = 0;
    p++
    if (p == message.length)
      p = 0;
  }
}

/* or do it using mod */
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
