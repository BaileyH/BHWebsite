/****************** GLOBAL VARIABLES *********************/
/***** variables for drawing  *****/
var zeroX = 10;               // coordinates of the top-left corner of the grid
var zeroY = 10;
var borderW = 3;              // border of the grid
var gridW = 1;
var squareSize = 60;          // size, in px, of each square of grid - fully scalable!
var triSize = squareSize/2;


/***** variables for playing *****/
var myLvl = 0;                // global for the current level (0-14)
var username;                 // name for student verification TODO: make records and logins



/***** data tables *****/
// dances - URLs for gifs to play on winScreen
var dances = ["https://media1.giphy.com/media/3o7qE2VAxuXWeyvJIY/giphy.gif",
              "https://media.giphy.com/media/jzaZ23z45UxK8/giphy.gif",
              "https://media.tenor.com/images/7f346009288eb4194e70d580f591d4c8/tenor.gif",
              "https://media.giphy.com/media/ygx2z9nIBYSeFPqt75/giphy.gif",
              "https://media.giphy.com/media/5ts3wTHyJHHZRamago/giphy.gif",
              "https://media.giphy.com/media/7TM8kWy04HzcA/200.gif",
              "https://media0.giphy.com/media/l4JyOrGkMIwwGFvOg/giphy.gif",
              "https://media.giphy.com/media/Xw6yFn7frR3Y4/giphy.gif",
              "https://media.tenor.com/images/948749192b21921aa14ff0d00b8399af/tenor.gif",
              "https://i.pinimg.com/originals/74/4f/13/744f13094d528536c4a8fb32af6e63fc.gif",
              "https://media.giphy.com/media/3rgXBQIDHkFNniTNRu/giphy.gif"];

// levels - an array of objects, one element per level. Includes:
//      code - the URL of the image to display on that level
//      start - an object that contains the starting x,y of Pointer (dir is always "right")
//      blocks - an array of objects containing x,y for each obstacle block
var levels = [{code: "assets/Q0.png", start: {x: 2, y: 2}, blocks: [{x: 3, y: 2}]},
              {code: "assets/Q0.png", start: {x: 1, y: 2}, blocks: [{x: 1, y: 1}, {x: 1, y: 4}]},
              {code: "assets/Q0.png", start: {x: 1, y: 2}, blocks: [{x: 2, y: 1}, {x: 2, y: 4}]},
              
              {code: "assets/Q1.png", start: {x: 1, y: 2}, blocks: [{x: 2, y: 2}]},
              {code: "assets/Q1.png", start: {x: 1, y: 2}, blocks: [{x: 1, y: 1}, {x: 2, y: 2}]},
              {code: "assets/Q1.png", start: {x: 1, y: 2}, blocks: [{x: 1, y: 1}, {x: 2, y: 2}, {x: 1, y:3}]},
              
              {code: "assets/Q2.png", start: {x: 1, y: 2}, blocks: [{x: 2, y: 2}, {x: 1, y: 3}]},
              {code: "assets/Q2.png", start: {x: 1, y: 2}, blocks: [{x: 1, y: 1}]},
              {code: "assets/Q2.png", start: {x: 1, y: 2}, blocks: [{x: 0, y: 2}, {x: 1, y: 3}]},
              
              {code: "assets/Q3.png", start: {x: 1, y: 2}, blocks: [{x: 2, y: 2}]},
              {code: "assets/Q3.png", start: {x: 1, y: 2}, blocks: [{x: 0, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}]},
              {code: "assets/Q3.png", start: {x: 1, y: 2}, blocks: [{x: 0, y: 2}, {x: 2, y: 3}]},

              {code: "assets/Q4.png", start: {x: 2, y: 2}, blocks: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0},
                                                           {x: 2, y: 1}, {x: 0, y: 2}, {x: 4, y: 2},
                                                             {x: 2, y: 3}, {x: 1, y: 4}, {x: 2, y: 4},
                                                             {x: 3, y: 4}]},
                                             
              {code: "assets/Q4.png", start: {x: 2, y: 2}, blocks: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0},
                                                             {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1},
                                                             {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3},
                                                             {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}]},

              {code: "assets/Q4.png", start: {x: 2, y: 2}, blocks: [{x: 2, y: 0}, {x: 3, y: 0}, {x: 1, y: 1},
                                                             {x: 2, y: 1}, {x: 2, y: 3}, {x: 3, y: 3},
                                                             {x: 1, y: 4}, {x: 2, y: 4}]}
];

// answers - an array of objects, one element per level. Includes:
//      x,y,dir - coordinates and direction of Pointer in correct ending position
//      crash - whether or not the Pointer should crash
var answers = [{x: 1, y: 2, dir: "left",  crash: false},
               {x: 1, y: 4, dir: "down",  crash: true},
               {x: 1, y: 0, dir: "up",    crash: false},
               
               {x: 1, y: 1, dir: "up",    crash: false},
               {x: 1, y: 3, dir: "down",  crash: false},
               {x: 1, y: 3, dir: "down",  crash: true},
               
               {x: 1, y: 3, dir: "down",  crash: true},
               {x: 1, y: 3, dir: "down",  crash: false},
               {x: 2, y: 2, dir: "right", crash: false},
               
               {x: 2, y: 2, dir: "right", crash: true},
               {x: 2, y: 1, dir: "up",    crash: false},
               {x: 3, y: 2, dir: "right", crash: false},
               
               {x: 3, y: 4, dir: "down",  crash: true},
               {x: 3, y: 3, dir: "down",  crash: true},
               {x: 3, y: 0, dir: "up",    crash: true}];


var Pointer = {               // an object that holds info about the Pointer
  x: levels[myLvl].start.x,
  y: levels[myLvl].start.y,
  dir: "right"
};

/****************** MAIN CODE *********************/
/***** landingScreen - start the game *****/
onEvent("startButton", "click", function() {
  // error message if user didn't put in a real name
  if(getText("nameInput") == "") {
    showElement("promptLabel");
    setTimeout(function() {
      //console.log("1000 milliseconds have elapsed");  //for testing
      hideElement("promptLabel");
    }, 1000);
  } else {
    username = getText("nameInput");
    setImageURL("codeImage", levels[myLvl].code);
    setScreen("mainScreen");
    initScreen();
  }
});


/***** mainScreen - move Pointer based on keyboard inputs *****/
onEvent("mainScreen", "keydown", function(event) {
  var key = event.key;
  //console.log(key); // for testing
  clearSquare();
  
  if((key == "w") || (event.keyCode == '38')) {           // up arrow
    moveF();
  } else if((key == "s") || (event.keyCode == '40')) {    // down arrow
    moveB();
  } else if((key == "a") || (event.keyCode == '37')) {    // left arrow
    turnL();
  } else if((key == "d") || (event.keyCode == '39')) {    // right arrow
    turnR();
  } else if((key == "r") || (event.keyCode == '8')) {     // backspace
    resetPointer();
  }
  updateScreen();
});


/***** mainScreen - show and hide code *****/
onEvent("codeButton", "click", function() {
  if(getText("codeButton") == "Show Code") {
    showElement("codeImage");
    setImageURL("codeImage", levels[myLvl].code);
    setText("codeButton", "Hide Code");  
  } else {
    hideElement("codeImage");
    setText("codeButton", "Show Code");
  }
});


/***** mainScreen - reset the pointer on the restart button *****/
onEvent("restartButton", "click", function(){
  clearSquare();
  resetPointer();
  updateScreen();
});


/***** mainScreen - submit answer *****/
onEvent("subButton", "click", function() {
  // checking to see if crash is checked correctly
  var correctCrash = false;
  if((getChecked("notCrashButton") == true) && (answers[myLvl].crash == false)){
    correctCrash = true;
  } else if ((getChecked("crashButton") == true) && (answers[myLvl].crash == true)) {
    correctCrash = true;
  }
  
  // correct answer
  if (correctCrash && (Pointer.x == answers[myLvl].x) && (Pointer.y == answers[myLvl].y) && 
    (Pointer.dir == answers[myLvl].dir)){
      // final correct answer - done with game!
      if(myLvl == 14) {
        setImageURL("endImage", dances[randomNumber(0, dances.length-1)]);
        setText("endArea", "Good job, " + username + "! You completed all the puzzles!" + 
          "Take a screenshot of this message and email it to your teacher!");
        setScreen("endScreen");
      // intermediate correct answer - keep playing
      } else {
        setText("scoreLabel", "You finished " + (myLvl+1) + " out of 15 puzzles!");
        setImageURL("winImage", dances[randomNumber(0, dances.length-1)]);
        setTimeout(function() {
          //console.log("1000 milliseconds have elapsed"); // for testing
          setScreen("winScreen");
        }, 300);
      }
      
  // incorrect answer
  } else {
    showElement("tryAgainLabel", "Try Again!");
    setTimeout(function() {
      //console.log("1000 milliseconds have elapsed"); // for testing
      hideElement("tryAgainLabel");
    }, 1000);
  } 
});


/***** winScreen - go to the next level *****/
onEvent("nextButton", "click", function() {
  myLvl++;
  setImageURL("codeImage", levels[myLvl].code);
  setScreen("mainScreen");
  initScreen();
});


/***** endScreen - play again from the beginning *****/
onEvent("playAgainButton", "click", function (){
  myLvl = 0;
  username = "";
  setText("nameInput", "");
  setImageURL("codeImage", levels[myLvl].code);
  setScreen("landingScreen");
});



/****************** FUNCTION DEFINITIONS *********************/
/***** initScreen - initializes grid/pointer whenever user enters mainScreen *****/
function initScreen() {
  clearScreen();
  drawGrid();
  drawBlocks();
  hideElement("tryAgainLabel");
  setChecked("notCrashButton", true);
  setChecked("crashButton", false);
  setText("codeButton", "Hide Code");
  resetPointer();
  drawPointer();
  moveTo(1000,1000);    // moves turtle off the screen
  penUp();
}


/***** resetPointer - resets pointer upon Restart button or initializing screen *****/
function resetPointer() {
  Pointer.x = levels[myLvl].start.x,
  Pointer.y = levels[myLvl].start.y,
  Pointer.dir = "right";
}


/***** drawBlocks - draws the obstacle blocks *****/
function drawBlocks() {
  var newX;
  var newY;
  for (var i = 0; i < levels[myLvl].blocks.length; i++){
    newX = zeroX + levels[myLvl].blocks[i].x*squareSize;
    newY = zeroY + levels[myLvl].blocks[i].y*squareSize;
    drawSquare(newX, newY, squareSize, 1, "black", "gray");
  }
}


/***** moveF - moves Pointer forward in space-coordinate system *****/
function moveF() {
  if(Pointer.dir == "right"){
    if(Pointer.x != 4){
      Pointer.x++;
    }
  } else if(Pointer.dir == "down") {
    if(Pointer.y != 4){
      Pointer.y++;
    }
  } else if(Pointer.dir == "left") {
    if(Pointer.x != 0) {
      Pointer.x--;  
    }
  } else if(Pointer.dir == "up") {
    if(Pointer.y != 0) {
      Pointer.y--;
    }
  }
}


/***** moveB - moves Pointer backward in space-coordinate system *****/
function moveB() {
  if(Pointer.dir == "right"){
    if(Pointer.x != 0) {
      Pointer.x--;
    }
  } else if(Pointer.dir == "down") {
    if(Pointer.y != 0) {
      Pointer.y--;
    }
  } else if(Pointer.dir == "left") {
    if(Pointer.x != 4) {
      Pointer.x++;  
    }
  } else if(Pointer.dir == "up") {
    if(Pointer.y != 4) {
      Pointer.y++;
    }
  }
}


/***** turnR - turns Pointer right depending on current direction *****/
function turnR() {
  if(Pointer.dir == "right"){
    Pointer.dir = "down";
  } else if(Pointer.dir == "down") {
    Pointer.dir = "left";
  } else if(Pointer.dir == "left") {
    Pointer.dir = "up";
  } else if(Pointer.dir == "up") {
    Pointer.dir = "right";
  }
}


/***** turnL - turns Pointer left depending on current direction *****/
function turnL() {
  if(Pointer.dir == "right"){
    Pointer.dir = "up";
  } else if(Pointer.dir == "down") {
    Pointer.dir = "right";
  } else if(Pointer.dir == "left") {
    Pointer.dir = "down";
  } else if(Pointer.dir == "up") {
    Pointer.dir = "left";
  }
}


/***** drawPointer - draws a triangle in the space-coordinate system *****/
function drawPointer() {
  var centerX = (zeroX+squareSize/2) + Pointer.x*squareSize;
  var centerY = (zeroY+squareSize/2) + Pointer.y*squareSize;
  
  if(Pointer.dir == "up") {
    drawTri(centerX - triSize/2, centerY + triSize/2, Pointer.dir);
  } else if(Pointer.dir == "right") {
      drawTri(centerX - triSize/2, centerY - triSize/2, Pointer.dir);
  } else if(Pointer.dir == "down") {
      drawTri(centerX + triSize/2, centerY - triSize/2, Pointer.dir);
  } else if(Pointer.dir == "left") {
      drawTri(centerX + triSize/2, centerY + triSize/2, Pointer.dir);
  }
  penUp();
}


/***** drawGrid - calls drawSquare 25 times to make a 5x5 grid *****/
function drawGrid(){
  // draw border
  drawSquare(zeroX, zeroY, squareSize*5, borderW, "black", "white");
  
  // draw each square in the grid
  for (var i = 0; i < 5; i++){
    for (var j = 0; j < 5; j++) {
      drawSquare(zeroX + i*squareSize, zeroY + j*squareSize, squareSize, 
        gridW, "black", "white");
    }
  }
  penUp();
}


/***** drawSquare - function to be used for grid, block, and target *****/
function drawSquare(x, y, size, borderWidth, borderColor, fillColor) {
  penUp();
  moveTo(x + borderWidth*2, y + borderWidth*2); // added offset to make it fit better
  turnTo(90);

  // fills in a nonwhite square
  if(fillColor != "white"){
    penDown();
    penColor(fillColor);
    penWidth(5);                                // thicker pen so it would  go faster
    penDown();
    for (var j = 0; j < size/2-borderWidth*2; j++) {
      moveForward(size - borderWidth*4);        // added offsets incrementally here
      moveBackward(size - borderWidth*4);
      turnRight(90);
      moveForward(2);
      turnLeft(90);
    }
    moveForward(size - borderWidth*4);  // I had to add these b/c there was one extra down stroke
    moveBackward(size - borderWidth*4);
    penUp();
  }
  
  // border at the end
  moveTo(x,y);
  penDown();
  penWidth(borderWidth);
  penColor(borderColor);
  for(var i = 0; i < 4; i++){           
    moveForward(size);
    turnRight(90);
  }
  penUp();
}


/***** drawTri - draws a filled in triangle pointing the specified direction *****/
function drawTri(x, y, dir) {
  // pen init
  penUp();
  moveTo(x, y);
  penWidth(1);
  penColor("black");
  penDown();
  
  // choose the initial direction
  if(dir == "up") {
    turnTo(0);
  } else if(dir == "right") {
    turnTo(90);
  } else if(dir == "down") {
    turnTo(180);
  } else if(dir == "left") {
    turnTo(270);
  }
  turnRight(90); // start drawing the back
  
  // fill in a black triangle
  for (var i = triSize; i > 0; i -= 2) {
    moveForward(i);
    turnLeft(90);
    moveForward(1);
    turnLeft(90);
    moveForward(i-1);
    turnRight(90);
    moveForward(1);
    turnRight(90);
  }
  penUp();
}


/***** clearScreen - removes all that's on the screen using a big white dot *****/
function clearScreen() {
  penColor("white");
  dot(100000);
  penColor("black");
  penUp();
} 

 
/***** clearSquare - clears square that the pointer is leaving from *****/
function clearSquare(){
  var rawX = zeroX + squareSize/2 + squareSize*Pointer.x;
  var rawY = zeroY + squareSize/2 + squareSize*Pointer.y;
  
   // only clears the screen w/ gray if Pointer was on a block
  penColor("white");  // default clear color
  for (var i = 0; i < levels[myLvl].blocks.length; i++){   
    if(Pointer.x == levels[myLvl].blocks[i].x && Pointer.y == levels[myLvl].blocks[i].y) {
      penColor("gray");
    }
  }
  // moves to the center and draws a circle to cover up old pointer
  moveTo(rawX, rawY);
  dot(squareSize/2-4);
  penColor("black");
}


/***** updateScreen - clears and replaces screen elements with updated versions *****/
function updateScreen() {
  drawPointer();
  moveTo(1000,1000);    // moves turtle off the screen
  penUp();
}
