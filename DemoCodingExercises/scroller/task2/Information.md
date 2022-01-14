/*
Create an account on P5js (so you can save your code) 

The lead coder has asked to plug your function into this piece of p5Js demo code
copy this code to your p5 sketch (make sure you add your function to the end of the sketch). 
*/ 

function setup() { 
  createCanvas(350, 400); 
  textFont("monospace",16) 
  gap = textWidth("x"); 
} 

let message = "Hello and welcome to the demo @@@@@@@@@@@@@@@@ wobbly ???    "; 
let p = 0; 

function logicSimple(){ 
  p++; 
  if (p == message.length) 
    p = 0; 
} 

function draw() { 
  background(200); 
  logicSimple(); 
  let m = segment(message, p,30); 
  drawmessageSimple(m,0,150); 
} 

let gap = 0; 

function drawmessageSimple(t, x, y){ 
  for (let i = 0; i < t.length; i++){ 
    xpos = x + i * gap 
    ypos = y 
    text(t.substring(i,i+1), xpos, ypos); 
  } 
} 