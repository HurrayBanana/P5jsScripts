# pixel scrolling

Currently the scrolling message is a little jerky because it moves one character space at a time.

The lead coder has suggested that one way of changing from character to pixel scrolling is to use an offset value that is added to the starting x position

e.g.
```
waveMessage(m, 0 - pixelOffset, 200);
```

## Your task

introduce a new global variable called pixelOffset
modify the logicSimple function so after a delay, we increase the offset value by a small amount 1 or less.
If the offset is greater than the value of gap (the width of a character) we:
* set the offset to 0
* increase our message pointer p by 1 (and do the previous rest of that if over message length

```
    function logicSimple(){
      delay++;
      if (delay % 30 == 0)
      {
        // code to increase the value of pixelOffset
        // if to check if pixelOffset is bigger than a character width
        {        
          //  reset pixelOffset then increase scroll position as before
          p++
          if (p == message.length)
            p = 0;
        }
      }
    }
```
You may need to decrease the delay time as we are using that to control the pixel scrolling speed now rather than character scrolling.
