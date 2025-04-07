let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteMovement: 0,
    spriteImgNumber: 1, 
    spriteDirection: 1,
    spriteResetPoint: 0,
    tokenCount: 0,
    skin: "",
    jumpHeight: 0,
    gravity: 5

}
let GAME_CONFIG = {
  gameSpeed: 30,
  characterSpeed: 5 
}
let MAP = {
    map: document.getElementById('gameMap'),
    level1Entrance: document.getElementById('level1Entrance'),
    level2Entrance: document.getElementById('level2Entrance'),
    level3Entrance: document.getElementById('level3Entrance'),
    shopEntrance: document.getElementById('shopEntrance')
}
function gameLoop() {
  console.log('Game Loop Running');
  if (KEY_EVENTS.leftArrow) {
    checkForCollisionsWithLevelEntrance()
     movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, 1);
      animatePlayer();
  }
  if (KEY_EVENTS.rightArrow) {
    checkForCollisionsWithLevelEntrance()
      movePlayer(GAME_CONFIG.characterSpeed, 0, -1);
      animatePlayer();
  }
  if (KEY_EVENTS.upArrow) {
    checkForCollisionsWithLevelEntrance()
     movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);
      animatePlayer();
  }
  if (KEY_EVENTS.downArrow) {
    checkForCollisionsWithLevelEntrance()
      movePlayer(0, GAME_CONFIG.characterSpeed, 0);
      animatePlayer();
  }
  if (KEY_EVENTS.space) {

  }
  if(KEY_EVENTS.shift){
    GAME_CONFIG.characterSpeed = 10;
  }
  else{
    GAME_CONFIG.characterSpeed = 5;
  }
  gameLoopTimeout = setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}
function movePlayer(dx, dy, dr) {
  let rect = PLAYER.box.getBoundingClientRect();
  let newX = rect.left + dx;
  let newY = rect.top + dy;

  const FIELD_WIDTH = window.innerWidth 
  const FIELD_HEIGHT = window.innerHeight 

  if (newX < 0) newX = 0;
  if (newX + rect.width > FIELD_WIDTH) newX = FIELD_WIDTH - rect.width;
  if (newY < 0) newY = 0;
  if (newY + rect.height > FIELD_HEIGHT) newY = FIELD_HEIGHT - rect.height;

  PLAYER.box.style.position = "absolute"; 
  PLAYER.box.style.left = newX + "px";
  PLAYER.box.style.top = newY + "px";

  if (dr !== 0 && dr !== PLAYER.spriteDirection) {
      PLAYER.spriteDirection = dr;
      PLAYER.box.style.transform = `scaleX(${-dr})`;
  }
}

function animatePlayer() {
  if (PLAYER.spriteImgNumber < 8) {
    PLAYER.spriteImgNumber += 1;
  } else {
    PLAYER.spriteImgNumber = 1;
  }
  document.getElementById('spriteImg').src = PLAYER.skin + "/running/sprite_" + PLAYER.spriteImgNumber +".png";
}
function skinSelect(index) {
    switch (index) {
      case 0:
        PLAYER.skin = "../images/Player/Shinobi";
       
        break;
      case 1:
        PLAYER.skin = "../images/Player/Samurai";

        break;
      case 2:
        PLAYER.skin = "../images/Player/Fighter";
        break;
      default:
        throw new Error('Invalid index');
    }
    try {
      document.getElementById('spriteImg').src = PLAYER.skin + "/running/sprite_1.png";
    } catch (error) {
      console.error('Error updating sprite image:', error);
    }
    document.getElementById('playerSelection').style.display = "none";
    MAP.map.style.display = "block";
    gameLoop();
  }
  function howToPlay(){
    var howToPlay = document.getElementById('howToPlay')
    if(howToPlay.style.display === "none"){
      howToPlay.style.display = "block"
      let howToPlayText = `
      <div id= "howToText">
      <h2>So spielst du</h2>
      <h3>Steuerung:</h3>
      <p>Benutze WASD um den Spieler zu steuern</p>
      <p>Du kannst während du SHIFT gedrückt hältst sprinten</p>
      <p>Drücke SPACE um in den Leveln zu springen</p>
      <p>Drücke ESC um das Level zu pausieren</p>
      <p>Benütze den Shop um die gesammelten Münzen für Boosts auszugeben</p>
      <button onclick="howToPlay()">Schließen</button>
      </div>
      `
      howToPlay.innerHTML = howToPlayText
    }
    else{
      howToPlay.style.display = "none"
    }
  }
  function checkForCollisionsWithLevelEntrance(){
    if(isColliding(PLAYER.box,MAP.level1Entrance, 0)){
      console.log("Level 1 Entrance");
      document.getElementById('level1Entrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um Level 1 zu betreten</p>
      `
      if(KEY_EVENTS.e){
        console.log("Entered IF")
        enterLevel1()
      }
    }
    else if(isColliding(PLAYER.box,MAP.level2Entrance, 0)){
      console.log("Level 2 Entrance");
      document.getElementById('level2Entrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um Level 2 zu betreten</p>
      `
    }
    else if(isColliding(PLAYER.box,MAP.level3Entrance, 0)){
      console.log("Level 3 Entrance");
      document.getElementById('level3Entrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um Level 3 zu betreten</p>
      `
    }
    else if(isColliding(PLAYER.box,MAP.shopEntrance, 0)){
      console.log("Shop Entrance");
      document.getElementById('shopEntrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um den Shop zu betreten</p>
      `
    }
    else{
      document.getElementById('level1Entrance').innerHTML = ''
      document.getElementById('level2Entrance').innerHTML = ''
      document.getElementById('level3Entrance').innerHTML = ''
      document.getElementById('shopEntrance').innerHTML = ''
    }
  }
  function enterLevel1(){
    MAP.map.style.display = "none";
    document.getElementById('level1').style.display = "block";
  }
  function enterLevel2(){
    MAP.map.style.display = "none";
    document.getElementById('level2').style.display = "block";
  }
  function enterLevel3(){
    MAP.map.style.display = "none";
    document.getElementById('level3').style.display = "block";
  }
  function enterShop(){
    MAP.map.style.display = "none";
    document.getElementById('shopGUI').style.display = "block";
  }


