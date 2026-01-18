//Settings you can change
let usePlaceHolderPhrases = false;
let canContinue  = true;

//Don't touch
//This library will be used: https://www.npmjs.com/package/p5.createloop
//This library will be used too: https://github.com/loneboarder/p5.experience.js
let nativeCanvasSize;
let dialogueBottomSize = 192;
let storyBorderSize = 10;
//misc
let normalFontSize = 22;
let fontStyleConfig;
let linesUsing = 4;
//dont touch
let textScaleFactor1 = 1;
//pages and scenes
let curPage = 0;
let maxPage = 31;
let curScene = 1;
//objs for the project
let cupidDoorPosX;
let cupidDoorPosY;
let witchDoorPosX;
let witchDoorPosY;
let firePlaceLogsPosX;
let firePlaceLogsPosY;
let witchDoorIsOpen = false;
let fireIsActive = false;
//media sounds
let pageClick;
//media images
let megaFlowerVase;
let randHeartPositions;
let numHearts = 32;

/*
Random hearts generation
for (let i; i < numHearts; i++){
  
}
*/

function preload(){
  //sound
  pageClick = loadSound('./sound/general-UI-click.ogg');
  doorOpen = loadSound('./sound/door-open.ogg');
  doorKnock = loadSound('./sound/door-knock.mp3');
  fireStart = loadSound('./sound/match-start.ogg');
  magicalTranform = loadSound('sound/magic-transform.ogg');
  //images
  flowerCard = loadImage('./images/heart-shaped-flowers.png');
  megaFlowerVase = loadImage('./images/vase-with-big-flowers.png');
  bowEffectItem = loadImage('./images/bow-effect-card.png');
  woodenFloor = loadImage('./images/wooden-floor.png');
  flowerVaseCard = loadImage('./images/flower-vase-card.png');
  cloudEffectTransformation = loadImage('./images/cloud-effect-transformation.png');
  cutieHearts = loadImage('./images/cutie-hearts.png');
  cupidWorkshopWallPaper = loadImage('./images/cupid-workshop-wallpaper.png');
  cupidWorkshopDoor = loadImage('./images/Cupid-Door-ONLY.png');
  cupidWorkshopDoorBorder = loadImage('./images/cupid-house-door-border.png');
  cauldron = loadImage('./images/Caludron.png');
  jailWall = loadImage('./images/jailCellANDWall.png');
  witchDoorClosed = loadImage('./images/WitchDoorLair.png');
  witchDoorOpen = loadImage('./images/WitchDoorLair-open.png');
  //The fire place
  firePlaceLogs = loadImage('./images/fire-place-logs-processed.png');
  firePlaceNoFire = loadImage('./images/fire-place-no-fire.png');
  firePlaceWithFire = loadImage('./images/fire-place-with-fire.png');
  firePlaceBack = loadImage('./images/fire-place-wall-back.png');
  jailBack = loadImage('./images/jail-back-detail.png');
  jailMain = loadImage('./images/jail_main.png');
  //images of people
  /*
  cupidJackOLD = loadImage('./characters-images/Cupid-Jack.png');
  cupidSammyOLD = loadImage('./characters-images/Cupid-Sammy.png');
  */
  cupidJack = loadImage('./characters-images/cupid_jack_redraw.png');
  cupidSammy= loadImage('./characters-images/cupid_sammy_redraw.png'); 
  
  meanWitch1 = loadImage('./characters-images/mean-witch-1.png');
  meanWitch2 = loadImage('./characters-images/mean-witch-2.png');
  /*
  cupidJackCardOLD = loadImage('./characters-images/cupid-jack-card.png');
  cupidSammyCardOLD = loadImage('./characters-images/Cupid-Sammy-Card.png');
  */
  cupidJackCard = loadImage('./characters-images/cupid-jack-card-corrected.png');
  cupidSammyCard = loadImage('./characters-images/Cupid-Sammy-Card-corrected.png');
  
  meanWitchCard1 = loadImage('./characters-images/mean-witch-card-1.png');
  meanWitchCard2 = loadImage('./characters-images/mean-witch-card-2.png');
  /*
  cupidSupervisor_OLD = loadImage('./characters-images/cupid-supervisor.png');
  */
  cupidSupervisor = loadImage('./characters-images/cupid_supervisor_redraw.png');
  //title card
  titleCardEpisode = loadImage('./images/the-cupid-title-card-witch-invasion.png');
}

let activePhrases = [
  "",
  "",
  "",
  "",
];

let phrases = [
  "Unknown page to load",
  //page 1 | 1-3
  "Once upon a time, there was a flower card here out",
  "of nowhere. A flower card is not just here out of ",
  "nowhere…",
  //page 2 | 4-6
  "We also had cupids flying around here. The cupids",
  "used their magical bow and aimed it for the flower",
  "vase.",
  //page 3 | 7
  "The bow’s arrow approached the flower vase.", //cutting of point for line
  //Page 4 | 8 - 9
  "The flower vase had disappeared and smoke and",
  "heart fragments had appeared.",
  //Page 5 | 10 - 11
  "The flower vase had been turned into a card that",
  "is shaped like a heart on the floor.",
  //Page 6 | 12
  "Someone is knocking the door! Who can that be?",
  //Page 7 | 13
  "The witches appeared!",
  //Page 8 | 14 - 15
  "These witches are up to no good and who knows",
  "what the witches will do.",
  //Page 9 | 16
  "One of the witches said, “Your mine now punies!",
  //Page 10 | 17
  "The cupids failed to stop the witches in time so…",
  //Page 11 | 18 - 19
  "The cupids had been turned into cards that are",
  "shaped like a heart.",
  //Page 12 | 20
  "The cupids as cards were locked inside the mini cell.",
  //Page 13 | 21 - 22
  "The cupids heard the witches talking about their",
  "next plan outside of the mini cell.",
  //Page 14 | 23 - 25
  "One of the witches said, “perfect, these punies",
  "will soon be sold off as Valentine’s Day cards to",
  "major retailers.”",
  //Page 15 | 26 - 28
  "The witches put a heart shaped card into the",
  "cauldron and then a bunch of cards rapidly fire",
  "upwards.",
  //Page 16 | 29 - 31
  "One of the witches said, “perfect! Let’s make copies",
  "of the cupid cards and let’s sell these cards to the",
  "masses!”",
  //Page 17 | 32
  "Someone was knocking on the door.",
  //Page 18 | 33 - 34
  "One of the witches said, “Not again. I’ll take care of",
  "the intruder!” Should we trust the door?",
  //Page 19 | 35
  "The cupid’s supervisor has appeared!",
  //Page 20 | 36 - 37
  "The cupid’s supervisor said, “Hey witches, put these",
  "cupids back where they are!”",
  //Page 21 | 38 - 40
  "The witches said no and the witches fought back",
  "against the cupid’s supervisor with the bow and",
  "arrow they stole from the cupids.",
  //Page 22 | 41
  "Who won the fight?",
  //Page 23 | 42
  "[Fighting happens]",
  //Page 24 | 43
  "The cupid’s supervisor had won the fight!",
  //Page 25 | 44 - 46
  "The three witches have been transformed into",
  "cards that are shaped like a heart during the fight.",
  "",
  //Page 26 | 47 - 48 
  "The cupids have been transformed back into their",
  "normal forms.",
  //Page 27 | 49 - 50
  "The witches will pay the ultimate price for what",
  "they’ve done to the cupids.",
  //Page 28 | 51 - 54
  "The cupid’s supervisor decided that the witches as",
  "cards must be shredded into many pieces and to be",
  "thrown into the fireplace never to be seen again.",
  "",
  //Page 29 | 55 - 56
  "The cupids and their supervisor happily worked",
  "together to make cards again.",
  //page 30 | 57 - 59
  "This time, the entrance got protected with a",
  "password code; only the ones authorized can",
  "enter the card making workshop.",
  //page 31 | 60, 61, 62
  //62 is used as place holder
  "The cupids and supervisor lived happily ever after.",  
  "The END.",
  "",
  //page 32 | 63 - 66
  "Did you enjoy the story? Feel free to discuss it with",
  "me for feedback or compliment (Frances) during",
  "class or after class at appropriate times.",
  "",
  //page 33 | 67 - 68
  "I’ve made up this fairy tale story I’ve created with",
  "my imagination.",
  //Extras | 69 - 71
  "Please click the door to open the door.",
  "Click to open the door,",
  "to find out who knocked the door",
  "Click the log to start a fire",
];

function setActivePhrases(ph1ID = -1, ph2ID=-1, ph3ID=-1,ph4ID=-4){
  if (ph1ID >= 0){
    activePhrases[0] = phrases[ph1ID];
  }
  else{
    activePhrases[0] = "";
  }
  if (ph2ID >= 0){
    activePhrases[1] = phrases[ph2ID];
  }
  else{
    activePhrases[1] = "";
  }
  if (ph3ID >= 0){
    activePhrases[2] = phrases[ph3ID];
  }
  else{
    activePhrases[2] = "";
  }
  if (ph4ID >= 0){
    activePhrases[3] = phrases[ph4ID];
  }
  else{
    activePhrases[3] = "";
  }
}

function loadScene(){
  function scene1Official(){
    renderScalableImage(woodenFloor,-300,0,1);
    renderScalableImage(flowerCard,195,-5,0.45);
  }
  function scene2Official(){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-64,0,.3);
    renderScalableImage(cupidWorkshopWallPaper ,320,0,.3);
    //Other stuff
    renderScalableImage(woodenFloor,-205,160,.75);
    renderScalableImage(flowerCard,275,230,0.125);
    //Characters
    renderScalableImage(cupidJack ,40,32,0.225);
    renderScalableImage(cupidSammy,460,32,0.25);
  }
  function scene3Official(){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-64,0,.3);
    renderScalableImage(cupidWorkshopWallPaper ,320,0,.3);
    //Other stuff
    renderScalableImage(woodenFloor,-205,160,.75);
    renderScalableImage(megaFlowerVase,32,-40,.5);
    push();
    rotate(PI / 180 * 90);
    imageMode(CENTER);
    renderScalableImage(bowEffectItem,150,-500,.45);
    pop();
  }  
  function scene4Official(){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-64,0,.3);
    renderScalableImage(cupidWorkshopWallPaper ,320,0,.3);
    //Other stuff
    renderScalableImage(woodenFloor,-205,160,.75);
    renderScalableImage(cloudEffectTransformation ,64,24,.5);
    //The loop//
    renderScalableImage(cutieHearts ,64,24,.125);
  }
  function scene5Official(){
    renderScalableImage(woodenFloor,-167,0,.625);
    renderScalableImage(flowerVaseCard,240,64,.275);
  }
  function scene6Official(){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-64,0,.3);
    renderScalableImage(cupidWorkshopWallPaper ,320,0,.3);
    //The door
    cupidDoorPosX = convert2Scalable(275,"x");
    cupidDoorPosY = convert2Scalable(96,"x");
    renderScalableImage(cupidWorkshopDoor ,cupidDoorPosX,cupidDoorPosY,.3);
    renderScalableImage(cupidWorkshopDoorBorder ,260,35,.3);
    //The floor
    renderScalableImage(woodenFloor,-205,180,.75);    
    //Characters
    renderScalableImage(cupidJack ,40,32,0.225);
    renderScalableImage(cupidSammy,460,32,0.25);  
  }
  function scene7Official(showWeapon = false){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-64,0,.3);
    renderScalableImage(cupidWorkshopWallPaper ,320,0,.3);
    //The door
    push();
    fill(155,202,250);
    noStroke();
    rect(convert2Scalable(255,"x"), convert2Scalable(100,"y"), convert2Scalable(120,"width"), convert2Scalable(90,"height"));
    pop();
    renderScalableImage(cupidWorkshopDoorBorder ,240,30,.3);
    //The floor
    renderScalableImage(woodenFloor,-205,180,.75); 
    //Characters
    renderScalableImage(cupidJack ,40,32,0.225);
    renderScalableImage(cupidSammy,460,32,0.25); 
    //Witches
    renderScalableImage(meanWitch2,225,96,.26); 
    renderScalableImage(meanWitch1,320,82,.1);
    if (showWeapon == true){
      push();
      rotate(PI / 180 * 90);
      imageMode(CENTER);
      renderScalableImage(bowEffectItem,150,-275,.45);
      imageMode(CENTER);
      rotate(PI / 180 * 180);
      renderScalableImage(bowEffectItem,-150,420,.45);
      pop();
    }
  }
  function scene8Official(){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-640,-155,.75);
    renderScalableImage(cupidWorkshopWallPaper ,320,-155,.75);
    //The door
    push();
    fill(155,202,250);
    noStroke();
    rect(convert2Scalable(120,"x"), convert2Scalable(0,"y"), convert2Scalable(384,"width"), convert2Scalable(640,"height"));
    pop();
    
    //The door
    renderScalableImage(cupidWorkshopDoorBorder ,72,-190,1);
    
    //characters
    renderScalableImage(meanWitch2,16,32,.95); 
    renderScalableImage(meanWitch1,320,0,.375);
  }
  function scene9Official(){
    renderScalableImage(woodenFloor,-167,0,.625);
    //cupids as cards
    renderScalableImage(cupidJackCard ,140,64,.275);
    renderScalableImage(cupidSammyCard  ,320,64,.275);
  }
  function scene10Official(){
    //The back wall//
    renderScalableImage(jailBack ,0,67,.5);
    //The cards//
    renderScalableImage(cupidJackCard,180,96,.2);
    renderScalableImage(cupidSammyCard,370,96,.2); 
    //The front
    renderScalableImage(jailMain,0,0,.5);
    
    //Characters
  
  }
  function scene11Official(){
    renderScalableImage(jailWall,0,-320,.5);
    //The witch
    renderScalableImage(meanWitch1,192,-16,.425);
  }
  function scene12Official(){
    renderScalableImage(jailWall,0,-320,.5);
    renderScalableImage(cauldron ,160,100,.5);
    //The witches//
    renderScalableImage(meanWitch1,0,-32,.375);
    renderScalableImage(meanWitch2,320,32,.875);
  }
  function scene13Official(isDoorOpen=false){
    //The witch's place wall and floor
    renderScalableImage(jailWall,-160,-250,.375);
    renderScalableImage(jailWall,160,-250,.375);
    renderScalableImage(woodenFloor,-167,225,.625);
    witchDoorPosX = convert2Scalable(235,"x");
    witchDoorPosY = convert2Scalable(15,"y");
    //Something else
    if (isDoorOpen == false){
      renderScalableImage(witchDoorClosed ,witchDoorPosX,witchDoorPosY,.5);

    }
    else{
      renderScalableImage(witchDoorOpen  ,witchDoorPosX,witchDoorPosY,.5);
      renderScalableImage(cupidSupervisor,255,96,.15);      
    }
  }
  function scene14Official(clouds = false,witchesAsCards=false){
    //The witch's place wall and floor
    renderScalableImage(jailWall,-160,-100,.375);
    renderScalableImage(jailWall,160,-100,.375);
    renderScalableImage(woodenFloor,-167,225,.625);   
    //Other objects
    renderScalableImage(cauldron ,210,140,.325);
    //The witches
    if (witchesAsCards == false){
      renderScalableImage(meanWitch1,0,-32,.225);
      renderScalableImage(meanWitch2,0,32,.625);
    }
    else{
      //The cupids will be shown
      //Witches first
      renderScalableImage(meanWitchCard1,16,192,.125);
      renderScalableImage(meanWitchCard2,112,192,.125);
      //Then cupids//
      renderScalableImage(cupidJack,96,16,.175);
      renderScalableImage(cupidSammy,440,0,.225);
    }
    renderScalableImage(cupidSupervisor,420,96,.225); 
    if (clouds == true){
      renderScalableImage(cloudEffectTransformation ,64,0,.5);
      renderScalableImage(cloudEffectTransformation ,-128,64,.375);   
      renderScalableImage(cloudEffectTransformation ,400,166,.25);
      renderScalableImage(cloudEffectTransformation ,160,200,.325);
      renderScalableImage(cloudEffectTransformation ,0,230,.25);
    }

  }
  function scene15Official(){
    push();
    background(32);
    pop();
  }
  function scene16Official(){
      renderScalableImage(woodenFloor,-167,0,.625);
      //The witches as cards//
      renderScalableImage(meanWitchCard1 ,140,64,.275);
      renderScalableImage(meanWitchCard2  ,320,64,.275);
  }
  function scene17Official(hasFire = false){
    //The fire place//
    renderScalableImage(firePlaceBack ,0,0,.5);
    //The witches cards get burned in the fire place
    renderScalableImage(meanWitchCard1 ,120,95,.325);
   renderScalableImage(meanWitchCard2  ,340,95,.325);
    //Witches cards end
    firePlaceLogsPosX = convert2Scalable(160,"x");
    firePlaceLogsPosY = convert2Scalable(220,"y");
    renderScalableImage(firePlaceLogs,firePlaceLogsPosX,firePlaceLogsPosY,.35);
    
    if (hasFire == false){
      renderScalableImage(firePlaceNoFire ,0,0,.5);
    }
    else{
      renderScalableImage(firePlaceWithFire  ,0,0,.5);
    }
  }
  function scene18Official(){
    //The wall paper
    renderScalableImage(cupidWorkshopWallPaper ,-64,0,.3);
    renderScalableImage(cupidWorkshopWallPaper ,320,0,.3);
    //The door
    renderScalableImage(cupidWorkshopDoor ,255,96,.3);
    renderScalableImage(cupidWorkshopDoorBorder ,240,30,.3);
    //The floor
    renderScalableImage(woodenFloor,-205,180,.75);   
    //Characters
    renderScalableImage(cupidJack ,40,32,0.225);
    renderScalableImage(cupidSammy,460,32,0.25);
    renderScalableImage(cupidSupervisor,224,64,.25); 
  }
  switch(curPage){
    case 1:
      scene1Official();
      break;
    case 2:
      scene2Official();
      break;
    case 3:
      scene3Official();
      break;
    case 4:
      scene4Official();
      break;
    case 5:
      scene5Official();
      break;
    case 6:
        if (canContinue == false){
          scene6Official();
        }
        else{
          scene7Official();
        }        
      break;  
    case 7:
    case 8:
      scene7Official();
      break;
    case 9:
      scene8Official();
      break; 
    case 10:
      scene7Official(true);
      break;
    case 11:
      scene9Official();
      break;
    case 12:
      scene10Official();
      break;
    case 13:
      scene10Official();
      break;
    case 14:
      scene11Official();
      break;
    case 15:
      scene12Official();
      break;
    case 16:
      scene12Official();
      break; 
    case 17:
    case 18:
      if (witchDoorIsOpen == false){
        scene13Official(false);
      }
      else{
        scene13Official(true);
      }
      break;   
    case 19:
    case 20:  
      scene13Official(true);
      break; 
    case 21:  
      scene14Official(false);
      break; 
    case 22:
      scene14Official(true);
      break;
     case 23:
      //Scene 15 will be used for future arduino thing if there is time left
      scene15Official();
      break;
    case 24:
      scene14Official(false,true);
      break;
    case 25:
      scene16Official();
      break;
    case 26:
      scene14Official(false,true);
      break;
    case 27:
      scene16Official();
      break;
    case 28:
      if (fireIsActive == true){
        scene17Official(true);
      }
      else{
        scene17Official(false);
      }
      break;
    case 29:
    case 30:
    case 31:
      scene18Official();
      break;
  }
}

function updatePage(){
  switch(curPage){
    case 1:
        setActivePhrases(1,2,3);
      break;
    case 2:
        setActivePhrases(4,5,6);
      break;
    case 3:
        setActivePhrases(7);
      break;
    case 4:
        setActivePhrases(8,9);
      break;   
    case 5:
        setActivePhrases(10,11);
      break;
    case 6:
        setActivePhrases(12,69);
      break;
    case 7:
        setActivePhrases(13);
      break;
    case 8:
        setActivePhrases(14,15);
      break; 
    case 9:
        setActivePhrases(16);
      break;
    case 10:
        setActivePhrases(17);
      break; 
    case 11:
        setActivePhrases(18,19);
      break;
    case 12:
        setActivePhrases(20);
      break; 
    case 13:
        setActivePhrases(21,22);
      break; 
    case 14:
        setActivePhrases(23,24,25);
      break; 
    case 15:
        setActivePhrases(26,27,28);
      break;   
    case 16:
        setActivePhrases(29,30,31);
      break; 
    case 17:
        setActivePhrases(32);
      break; 
    case 18:
        setActivePhrases(33,34,70,71);
      break; 
    case 19:
        setActivePhrases(35);
      break;
    case 20:
        setActivePhrases(36,37);
      break;
    case 21:
        setActivePhrases(38,39,40);
      break; 
    case 22:
        setActivePhrases(41);
      break;  
    case 23:
        setActivePhrases(42);
      break;  
    case 24:
        setActivePhrases(43);
      break;  
    case 25:
        //46 is used as a place holder one
        setActivePhrases(44,45);
      break;  
    case 26:
        setActivePhrases(47,48);
      break;
    case 27:
        setActivePhrases(49,50);
      break; 
    case 28:
        setActivePhrases(51,52,53,72);
      break;
    case 29:
        setActivePhrases(55,56);
      break;  
    case 30:
        setActivePhrases(57,58,59);
      break; 
    case 31:
        setActivePhrases(60,61);
      break; 
    case 32:
        setActivePhrases(63,64,65);
      break; 
    case 33:
        setActivePhrases(67,68);
      break;   
    default:
        setActivePhrases(0);
  }
  loadScene();
}
let continueClick;
function setup() {
  //Canvas configuration
  canvasSize = createVector(640,512); //if you want to change the canvas size, alter the numbers on this line
  nativeCanvasSize = createVector(640,512); //don't alter the numbers on this line
  if (!(canvasSize.x == nativeCanvasSize.x && canvasSize.y == nativeCanvasSize.y)){
    console.log("The image is best rendered at native canvas size.");
  }
  createCanvas(canvasSize.x, canvasSize.y);
  if (canvasSize.x >= 1024 && canvasSize.y >= 960){
    textScaleFactor1 = 2;
  }
  //other
 fontStyleConfig = loadFont('./KGPayphone.ttf');

  //Set up the buttons here//
  //The button for next page//
  nextPageClick = new Clickable();
  nextPageClick.cornerRadius = 0;
  nextPageClick.textScaled = true;
  nextPageClick.text = "Next Page";
  nextPageClick.textSize = 14;
  nextPageClick.locate(convert2Scalable(325,"x"), convert2Scalable(455,"y"));
  nextPageClick.resize(convert2Scalable(140,"x"), convert2Scalable(42,"y"));
  nextPageClick.cornerRadius = 5;
  nextPageClick.textColor = "#000000";
  nextPageClick.stroke = "#505050";
  nextPageClick.textFont = "KG Payphone";
  nextPageClick.onOutside = function () {
    this.color = "#FFFFFF";
  }
  nextPageClick.onHover = function () {
    this.color = "#E02546";
    //backPage();
  }
  nextPageClick.onPress = function () {
    //alert("test");
    //console.log("Pressed next page.");
    this.color = "#FC78A6";
    continuePage();
  }
  //The button for previous page//
  previousPageClick = new Clickable();
  previousPageClick.textScaled = true;
  previousPageClick.text = "Previous Page";
  previousPageClick.textSize = 16;
  previousPageClick.locate(convert2Scalable(180,"x"), convert2Scalable(455,"y"));
  previousPageClick.resize(convert2Scalable(140,"x"), convert2Scalable(42,"y"));
  previousPageClick.cornerRadius = 5;
  previousPageClick.textColor = "#000000";
  previousPageClick.stroke = "#505050";
  previousPageClick.textFont = "KG Payphone";
  previousPageClick.onOutside = function () {
    this.color = "#FFFFFF";
  }
  previousPageClick.onHover = function () {
    this.color = "#E02546";
  }
  previousPageClick.onPress = function () {
    //alert("test");
    this.color = "#FC78A6";
    backPage();
  }  
}

//Image scalibility
function convert2Scalable(nativePoint,pType){
  //(currentCanvasWidth/x) = pointPositionOfNativeCanvasSize
  let eq1;
  let eq2;
  let eq3;
  if (pType == "width" || pType == "x"){
    eq1 = width*1;
    eq2 = nativePoint;
    eq3 = nativeCanvasSize.x/nativePoint;
    let resultantEQ = width/eq3;
    return resultantEQ;
  }
  else if (pType == "height" || pType == "y"){
    eq1 = height*1;
    eq2 = nativePoint;
    eq3 = nativeCanvasSize.y/nativePoint;
    let resultantEQ = height/eq3;
    return resultantEQ;
  }
  else{
    console.warn("Invalid point type dimension.");
    return nativePoint;
  }
}

function renderScalableImage(imgAsset,posX,posY,scale=1){ image(imgAsset,convert2Scalable(posX,"x"),convert2Scalable(posY,"y"),convert2Scalable(imgAsset.width*scale,"width"),convert2Scalable(imgAsset.height*scale,"height")); 
}

function draw() {
  background(255, 77, 77);
  if (curPage != 0){
    //Draw The HUD//
    push();
    updatePage();
    noStroke();
    fill(0);
    //bottom bar
    rect(0, (height - convert2Scalable(dialogueBottomSize,"y")), width, convert2Scalable(dialogueBottomSize,"height"));
    //left bar
    rect(0,0,convert2Scalable(storyBorderSize,"width"),(height - dialogueBottomSize));
    //right bar
      rect(width - convert2Scalable(storyBorderSize,"width"),0,convert2Scalable(storyBorderSize,"width"),(height - dialogueBottomSize));
    //top bar
    rect(0,0,width,convert2Scalable(storyBorderSize,"width"));
    pop();
    ////////////////storyBorderSize
  }
  else{
    push();
    renderScalableImage(titleCardEpisode ,0,0,.5);
    textFont(fontStyleConfig);
    textSize(16*textScaleFactor1);
    noStroke();
    fill(32,0,0);
    text("By Frances George", convert2Scalable(240,"x"), convert2Scalable(505,"y"));
    pop();
  }
  
  
  //Draw the dialogue//
  if (curPage != 0){
    push();
    textFont(fontStyleConfig);
    textSize(normalFontSize*textScaleFactor1);
    fill(255);
    stroke(0);
    strokeWeight(2);
    //text('Narrator:', convert2Scalable(10,"x"), convert2Scalable(350,"y"));
    textSize(normalFontSize*textScaleFactor1);
    if (linesUsing >= 1){
        if (usePlaceHolderPhrases == true){
          text('Line 1 test. This is the first line of text.', convert2Scalable(10,"x"), convert2Scalable(350,"y"));
        }
        else{
           text(activePhrases[0], convert2Scalable(30,"x"), convert2Scalable(350,"y"));
        }
    }
    if (linesUsing >= 2){
        if (usePlaceHolderPhrases == true){
          text('Line 2 test. This is the second line of text.', convert2Scalable(10,"x"), convert2Scalable(380,"y"));
        }
        else{
          text(activePhrases[1], convert2Scalable(30,"x"), convert2Scalable(380,"y"));
        }
    }
    if (linesUsing >= 3){
        if (usePlaceHolderPhrases == true){
          text('Line 3 test. This is the third line of text.', convert2Scalable(10,"x"), convert2Scalable(410,"y"));
        }
        else{
          text(activePhrases[2], convert2Scalable(30,"x"), convert2Scalable(410,"y"));
        }
    }
    if (linesUsing >= 4){
        if (usePlaceHolderPhrases == true){
          text('Line 4 test. This is the foruth and last line text.', convert2Scalable(10,"x"), convert2Scalable(440,"y"));
        }
        else{
          text(activePhrases[3], convert2Scalable(30,"x"), convert2Scalable(440,"y"));
        }
    }
    textSize(18*textScaleFactor1);
    //text("Click this area to continue", convert2Scalable(200,"x"), convert2Scalable(465,"y"));
    if (canContinue == true){
      nextPageClick.draw();
    }
    previousPageClick.draw();
    text("Page " + curPage + "/" + maxPage, convert2Scalable(510,"x"), convert2Scalable(465,"y"));
    pop();
  }
}

function checkPageRestrictions(){
  if (curPage == 6 || curPage == 18 || curPage == 28){
    canContinue = false;
  }
  else{
    canContinue = true;
  }
  //Disable things for the scene in b4 progressing
  if (curPage == 17 || curPage == 18){
    witchDoorIsOpen = false;
  }
  if (curPage == 28){
    fireIsActive = false;
  }
  //Door knock sound
  if (curPage == 17){
    doorKnock.play();
  }
  else if (curPage == 6){
    doorKnock.play();
  }
  else if (curPage == 4 || curPage == 11 || curPage == 22){
    magicalTranform.play();
  }
}

function continuePage() {
  //if (canContinue == true){
    if (curPage < maxPage){
      pageClick.play();
      curPage = curPage + 1;
    }
    else{
      pageClick.play();
      curPage = 1;
    }
    checkPageRestrictions();
  //}
}

function backPage(){
  //if (canContinue == true){
    if (curPage > 1){
      pageClick.play();
      curPage = curPage - 1;
    }
    else{
      pageClick.play();
      curPage = maxPage;
    }
   checkPageRestrictions();
  //}  
}

function mouseReleased(){
  if (curPage == 6){
    mouseDistDoor = dist(mouseX, mouseY, cupidDoorPosX, cupidDoorPosY);
    //console.log(mouseDistDoor);
    if (mouseDistDoor < 100){     
      canContinue = true;
      doorOpen.play();
    }
  }
  else if (curPage == 18){
    mouseDistDoor = dist(mouseX, mouseY, witchDoorPosX, witchDoorPosY);
    //console.log(mouseDistDoor);
    if (mouseDistDoor < 200){     
      canContinue = true;
      witchDoorIsOpen = true;
      doorOpen.play();
    }    
  }
  else if (curPage == 28){
    mouseDistFire = dist(mouseX, mouseY, firePlaceLogsPosX, firePlaceLogsPosY);
    //console.log(mouseDistFire);
    if (mouseDistFire < 280){  
      fireIsActive = true;
      canContinue = true;
      fireStart.play();
    }
  }
  else if (curPage == 0){
    pageClick.play();
    curPage = 1;
  }
}

