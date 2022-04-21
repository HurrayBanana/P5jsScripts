let messages = [];
//constants
const EMPTY = "< -- >";
const NULL = -1;
const MESSAGE = 0;
const LINK = 1;
const NEXT = "next available position";
const OVERFLOW = "overflow";
//globals
let lineDrop = 11;
let mode = OVERFLOW;
let hashtable = new Array(20);
let overflowtable = new Array(20)
let line = 20;
let messageToProcess = 0;
let maxentries = 50;
let freespace = 0;
let count = 0;
let adding = "";
/* UI elements */
let canv;
let slspeed;
let rdmethod;
let tbwords;


function setup() {
    canv = createCanvas(550, 800);
    createUI();
    init();
}

function createUI(){
  slspeed = createSlider(0,180, 120);
  slspeed.position(10,10);
  slspeed.value(0);

  rdmethod = createRadio();
  rdmethod.option('0','Next available position');
  rdmethod.option('1','overflow');
  rdmethod.selected('1');
  rdmethod.position(200,10);
  rdmethod.mouseClicked(methodchanged);

  tbwords = createElement('textarea');
  tbwords.attribute('rows',3);
  tbwords.style('resize','none');
  tbwords.position(10,35);
  tbwords.size(width - 50);
  tbwords.value('Enter a series of words. Each one will be entered into the hash table, duplicates will be ignored, maximum unique words is 100');
  tbwords.input(typed);
}

//picks up text entry interaction, stops data addition
function typed(){
  //stop processing if we are entering stuff
  slspeed.value(0);
}

function methodchanged(){
  if (rdmethod.value() == '0')
    mode= NEXT;
  else
    mode = OVERFLOW;
  init();
  if (slspeed.value() == 0)
    slspeed.value(1);
}

/* perform hash function on message 
 Need to mod by table size to keep in range
 This simple function just sums the ascii value of
 each character of the word
*/
function hashString(stringValue, scale){
    h = 0
    for (let p = 0; p < stringValue.length; p++){
      h += stringValue.charCodeAt(p);
    }
    return h % scale;
}

function init(){
  setuptables();
  freespace = 0;
  count = 0;
  adding = "";
  messageToProcess = 0;
  createMessages();
}

function createMessages(){
  let m = tbwords.value();
  m = m.replace(/,/gm,' ').replace('.',' ').replace(/\r?\n|\r/gm,' ');
  m = m.split(' ');
  messages = [];
  
  //only add words that we have space for
  for (let p = 0; p < m.length && messages.length < maxentries; p++){
    //m[p] = m[p].replace(/\s/g,'');
    if (m[p] != '' && messages.indexOf(m[p]) == -1)
      messages.push(m[p]);
  }
}
function setuptables(){
    let size = 50;
    maxentries = size*2;
    //double space for nex available position (so equivalent to overflow)
    if (mode == NEXT) 
        size *= 2;
  
    hashtable = new Array(size);

    for (let p = 0; p < hashtable.length; p++) {
        let b = []
        b.push(EMPTY);
        b.push(NULL);
        hashtable[p] = b;
    }
    if (mode == OVERFLOW) {
      overflowtable = new Array(1);
      for (let p = 0; p < 1; p++) {
          let b = []
          b.push(EMPTY);
          b.push(NULL);
          overflowtable[p] = b;
      }
    }
    
}

/* processes a particular message adding it to the hash table*/
function processThisMessage(index){
    thishash = hashString(messages[index], hashtable.length);
    if (hashtable[thishash][MESSAGE] == EMPTY)
      storehash(thishash, messages[index], NULL);
    else
      handleCollision(thishash, messages[index]);    
}

function storehash(loc, mess, link){
  //console.log("store@"+loc);
  dave = [mess,link];
  hashtable[loc] = dave;
  hashtable[loc][MESSAGE] = mess
  hashtable[loc][LINK] = link;
}

function handleCollision(pos, message){
  if (mode == NEXT)
    nextAvailable(pos, message);
  else
    overflow(pos,message);
}

function overflow(pos, message){
    overflowloc = setoverflow(message);
    if (overflowloc < overflowtable.length){
      if (hashtable[pos][LINK] == NULL)
          hashtable[pos][LINK] = overflowloc;
      else
          overflowtable[overflowloc][LINK] = hashtable[pos][LINK];
          hashtable[pos][LINK] = overflowloc;
    }
}

function setoverflow(message){
  if (freespace == overflowtable.length){
    let b = []
    b.push(EMPTY);
    b.push(NULL);
    overflowtable.push(b);
  }
  overflowtable[freespace][MESSAGE] = message;
  return freespace++;
}

function nextAvailable(pos, message){
  count = 0;
  searchPos = pos
  while (hashtable[searchPos][MESSAGE] != EMPTY && count < hashtable.length){
    count++;
    searchPos++; 
    //wrap
    if (searchPos == hashtable.length) {
      searchPos = 0;
    }
  }
  //deal with full table
  if (hashtable[searchPos][MESSAGE] != EMPTY)
    appendhash(pos," full no space collision " + message, NULL);
  //  hashtable[pos][MESSAGE] += " full no space collision " + message;
  else
    storehash(searchPos, message + " [collision @" + pos + "]", NULL);
    //hashtable[searchPos][MESSAGE] = message + " [collision]";
}

function appendhash(loc, mess, link){
    //console.log("store@"+loc);
    dave = [mess,link];
    hashtable[loc] = dave;
    hashtable[loc][MESSAGE] += mess
    hashtable[loc][LINK] = link;
  }

function logic(){
    count++;
    if (messageToProcess < messages.length && count % slspeed.value() == 0)
    {
        adding = messages[messageToProcess];
        processThisMessage(messageToProcess++);
    }
}

function draw() {
    logic();
    background(220);
    drawSpeed();
    line = 100;
    write("Last word added [" + adding + "] " + messageToProcess + " of " + messages.length + " unique words", 10,0);
    line = 120;
    if (mode == OVERFLOW) 
        OverflowDisplay();
    else
        NextposDisplay();
}

function drawSpeed(){
  let v = slspeed.value();
  let w = slspeed.size().width;
  let dw = w/180;
  let m;
  if (v == 0)
    m = "entry paused";
  else
    m = "add every " + (floor(v/60)==0?"":floor(v/60)) + ((v % 60==0) ? " sec ": " " + v % 60 + "//60 th sec");
  text(m, slspeed.position().x + dw * v, slspeed.position().y);
}

function OverflowDisplay(){
    h = line;
    write("SYMBOL TABLE", 10,lineDrop*2);
    write("Index", 10,0) ;
    write("Link", 50,0);
    write("Contents", 100,lineDrop);
    for (let p = 0; p < hashtable.length; p++){
      fill((hashtable[p][LINK]==NULL)?(hashtable[p][MESSAGE]==EMPTY?'grey':'black'):'blue');
      
      write(p, 10, 0);
      write((hashtable[p][LINK]==NULL?"NULL":hashtable[p][LINK]), 50, 0);
      write(hashtable[p][MESSAGE], 100, lineDrop);
    }
    line = h;
    write("OVERFLOW [freespace=" + freespace +"]",210,lineDrop*2);
    write("Index", 210,0);
    write("Link", 250,0);
    write("Contents", 300,lineDrop);
    
    for (let p = 0; p < overflowtable.length; p++){
      fill((overflowtable[p][LINK]==NULL && overflowtable[p][MESSAGE] != EMPTY)?'red':'black');
      write(p, 210, 0);
      write((overflowtable[p][LINK]==NULL?"NULL":overflowtable[p][LINK]), 250, 0);
      write(overflowtable[p][MESSAGE] + (overflowtable[p][LINK]==NULL && overflowtable[p][MESSAGE] != EMPTY? "    <- end of this overflow list":""), 300, lineDrop);
    }
}

function NextposDisplay(){
    write("SYMBOL TABLE", 10,lineDrop*2);
    write("Index", 10,0);
    write("Contents", 50,lineDrop);
    h = line;
    for (let p = 0; p < hashtable.length; p++){
        if (p == maxentries/2)
          line = h;
        fill((hashtable[p][MESSAGE].indexOf('[collision @')!= -1)?'red':(hashtable[p][MESSAGE]==EMPTY?'grey':'black'));

        write(p, 10 + 210 * floor(p/50), 0);
        write(hashtable[p][MESSAGE], 50+ 210 * floor(p/50), lineDrop);
    }
}

function write(s, x, drop){
    if (s.length > 50)
        s = s.substring(0,50) + "..";
    text(s, x+20, line);
    line += drop;
    return line;
}
