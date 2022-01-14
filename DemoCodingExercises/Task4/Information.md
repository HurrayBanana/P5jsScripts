/*
The lead coder as added a more funky way of drawing the pportion of the message

he wants you to experiment with it to get a pleasing affect.

Add the  angle variable and waveMessage() function to your skectch

and add a call in the draw function to call the waveMessage function
*/
<p>
<code>
waveMessage(m, 0, 200)


You may wish to comment the line in logicSimple() that increments p so you can concentrate on the shap of the wave

function logicSimple(){
  delay++;
  if (delay % 5 == 0)
  {
    //p++
    if (p == message.length)
      p = 0;
  }
}
</code>
</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/os5Dzn3-0NA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

