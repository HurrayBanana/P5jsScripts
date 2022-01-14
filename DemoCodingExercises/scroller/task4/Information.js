/*
The lead coder as added a more funky way of drawing the pportion of the message

he wants you to experiment with it to get a pleasing affect.

Add the  angle variable and waveMessage() function to your skectch

and add a call in the draw function to call the waveMessage function
*/

waveMessage(m, 0, 200)

/*
You may wish to comment the line in logicSimple() that increments p so you can concentrate on the shape of the wave
*/

function logicSimple(){
  delay++;
  if (delay % 5 == 0)
  {
    //p++
    if (p == message.length)
      p = 0;
  }
}





