# pixel scrolling

Currently the scrolling message is a little jerky because it moves one character space at a time.

The lead coder has suggested that one way of changing from character to pixel scrolling is to use an offset value that is added to the starting x position

e.g.
```
waveMessage(m, 0 - pixelOffset, 200);
```
