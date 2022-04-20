let hash;
let messages = [];
const EMPTY = "< -- >";
const NULL = -1;
const MESSAGE = 0;
const LINK = 1;
const NEXT = "next available position";
const OVERFLOW = "overflow";

let lineDrop = 11;
let mode = OVERFLOW;
let hashtable = new Array(20);
let overflowtable = new Array(20)
let line = 20;
let messageToProcess = 0;
let tablesize;
/* UI elements */
let canv;
let slspeed;
let rdmethod;
let tbwords;

function createUI(){
  slspeed = createSlider(0,180, 120);
  slspeed.position(10,10);
  slspeed.value(0);
  rdmethod = createRadio();
  rdmethod.option('0','Next available position');
  rdmethod.option('1','overflow');
  rdmethod.selected('1');
  rdmethod.position(200,10);
  //rdmethod.id('rdmethod');
  rdmethod.mouseClicked(methodchanged);
  //tbwords = createInput();
  tbwords = createElement('textarea');
  tbwords.attribute('rows',3);
  tbwords.style('resize','none');
  tbwords.position(10,35);
  tbwords.size(width - 50);
  tbwords.value('Enter a series of words. Each one will be entered into the hash table, duplicates will be ignored, maximum unique words is 100');
  tbwords.input(typed);
}
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
  setuptables();
  console.log(rdmethod.value());
}
/* perform hash function on message 
 Need to mod by table size to keep in range
*/
function hashString(stringValue, scale){
    h = 0
    for (let p = 0; p < stringValue.length; p++){
      h += stringValue.charCodeAt(p);
    }
    return h % scale;
}

function setup() {
    canv = createCanvas(550, 800);
    createUI();
    init();
    setuptables();
    //processMessages();
}

function init(){
  freespace = 0;
  count = 0;
  seconds = 0;
  adding = "";
  messageToProcess = 0;
  createMessages();
}
function createMessages(){
  let m = tbwords.value();
  m = m.replace(',','').replace('.','');
  m = m.split(' ');
  messages = [];
  for (let p = 0; p < m.length; p++){
    if (messages.indexOf(m[p]) == -1)
      messages.push(m[p]);
  }
}
function setuptables(){
    let size = 50;
    //double space for nex available position (so equivalent to overflow)
    if (mode == NEXT) 
        size *= 2;
    tablesize = size;
  
    hashtable = new Array(size);
    overflowtable = new Array(size);

    for (let p = 0; p < hashtable.length; p++) {
        let b = []
        b.push(EMPTY);
        b.push(NULL);
        hashtable[p] = b;
    }
    for (let p = 0; p < overflowtable.length; p++) {
        let b = []
        b.push(EMPTY);
        b.push(NULL);
        overflowtable[p] = b;
    }
}
/* process all messages in one go */
function processMessages(){
  for (let p = 0; p < messages.length; p++){
    thishash = hashString(messages[p], hashtable.length);
    
    if (hashtable[thishash][MESSAGE] == EMPTY)
      storehash(thishash, messages[p], NULL);
    else
      handleCollision(thishash, messages[p]);
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
  console.log("store@"+loc);
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

    if (hashtable[pos][LINK] == NULL)
        hashtable[pos][LINK] = overflowloc;
    else
        overflowtable[overflowloc][LINK] = hashtable[pos][LINK];
        hashtable[pos][LINK] = overflowloc;
}
let freespace = 0;
function setoverflow(message){
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
    console.log("store@"+loc);
    dave = [mess,link];
    hashtable[loc] = dave;
    hashtable[loc][MESSAGE] += mess
    hashtable[loc][LINK] = link;
  }
let count = 0;
let seconds = 0;
let adding = "";
function logic(){
    dotime();
    //add another every 2 seconds
//    if (messageToProcess < messages.length && count == 0 && seconds % 2 == 0)
    if (messageToProcess < messages.length && count % slspeed.value() == 0)
    {
        adding = messages[messageToProcess];
        processThisMessage(messageToProcess++);
    }
}

function dotime(){
    count ++;
    if (count == 60){
        seconds++;
        //count = 0;
    }
}

function draw() {
    logic();
    background(220);
    drawSpeed();
    line = 100;
    write("Last message added [" + adding + "]", 10,0);
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
      write(p, 210, 0);
      write((overflowtable[p][LINK]==NULL?"NULL":overflowtable[p][LINK]), 250, 0);
      write(overflowtable[p][MESSAGE], 300, lineDrop);
    }
    
}

function NextposDisplay(){
    write("SYMBOL TABLE", 10,lineDrop*2);
    write("Index", 10,0);
    write("Contents", 50,lineDrop);
    h = line;
    for (let p = 0; p < hashtable.length; p++){
        if (p == tablesize/2)
          line = h;
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
