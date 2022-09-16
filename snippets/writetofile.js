let x= 0
let writer;
function setup() {
  createCanvas(400, 400);
  writer = createWriter('numberlist.txt');
}

function draw() {
  background(220);
  if (x < 100){
    writer.print("value:" + x);
    x++;
  }
  text(x,10,10);
  if (x == 100) {
    writer.close();
    writer.clear();//clear from cache
    print("Done");
    x++;
  }
}
