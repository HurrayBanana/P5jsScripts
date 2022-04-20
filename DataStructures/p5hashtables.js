let hash;
let messages = ["the quick brown fox jumped over the lazy dog","ABC","XYZ", "EFG", "CBA", "ABD", "BAC", "BRAIN","DAVE","dave","CAR"];
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

/* perform hash function on message */
function hashString(stringValue, scale){
    h = 0
    for (let p = 0; p < stringValue.length; p++){
      h += stringValue.charCodeAt(p);
    }
    return h % scale;
}

function setup() {
    createCanvas(800, 800);
    setuptables();
    //processMessages();
}

function setuptables(){
    let size = 30;
    if (mode == NEXT) 
        size *= 2;

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
    if (messageToProcess < messages.length && count == 0 && seconds % 2 == 0)
    {
        adding = messages[messageToProcess];
        processThisMessage(messageToProcess++);
    }
}

function dotime(){
    count ++;
    if (count == 60){
        seconds++;
        count = 0;
    }
}

function draw() {
    logic();
    background(220);
    line = 20;
    write("Last message added [" + adding + "]", 10,0);
    line = 40;
    if (mode == OVERFLOW) 
        OverflowDisplay();
    else
        NextposDisplay();
}

function OverflowDisplay(){
    write("SYMBOL TABLE", 10,lineDrop*2);
    write("Index", 10,0);
    write("Link", 50,0);
    write("Contents", 100,lineDrop);
    for (let p = 0; p < hashtable.length; p++){
      write(p, 10, 0);
      write((hashtable[p][LINK]==NULL?"NULL":hashtable[p][LINK]), 50, 0);
      write(hashtable[p][MESSAGE], 100, lineDrop);
    }
    line = 20
    write("",410,lineDrop*2);
    write("OVERFLOW [freespace=" + freespace +"]",410,lineDrop*2);
    write("Index", 410,0);
    write("Link", 450,0);
    write("Contents", 500,lineDrop);
    
    for (let p = 0; p < overflowtable.length; p++){
      write(p, 410, 0);
      write((overflowtable[p][LINK]==NULL?"NULL":overflowtable[p][LINK]), 450, 0);
      write(overflowtable[p][MESSAGE], 500, lineDrop);
    }
    
}

function NextposDisplay(){
    write("SYMBOL TABLE", 10,lineDrop*2);
    write("Index", 10,0);
    write("Contents", 50,lineDrop*2);
    for (let p = 0; p < hashtable.length; p++){
        write(p, 10, 0);
        write(hashtable[p][MESSAGE], 50, lineDrop);
    }
}

function write(s, x, drop){
    if (s.length > 50)
        s = s.substring(0,50) + "..";
    text(s, x+20, line);
    line += drop;
}
