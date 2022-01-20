# Strectching the image to fill the canvas

Currently the scrolling message starts somewhere to the left of the screen

The lead coder has suggested that we could automatically adjust the width of the message to meet the size of the canvas


## Your task

introduce a new global variable called `messageWidth`

in the `setup()` function calculate the number of characters required to fill this width and store this in `messageWidth`

The calculation will be the width of the canvas `width` divided by the width of a character `gap` you will need to do this as the last line of the `setup()` function.

## secondary task - clean up

You will notice that there is still a single character on the right hand side **popping** onto the screen still, make a change to your width calculation to remove this problem.


*You may need to slow your scrolling down while you test your solution works.*
