let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteMovement: 0,
    spriteImgNumber: 0, 
    spriteDirection: 1,
    spriteResetPoint: 0,
    tokenCount: 0,
    skin: "",
    jumpHeight: 0

}
let GAME_CONFIG = {
  gameSpeed: 30,
  characterSpeed: 5 
}
let MAP = {
    map: document.getElementById('gameMap'),
  
}
function gameLoop() {
  console.log('Game Loop Running');
  if (KEY_EVENTS.leftArrow) {
      movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, 1);
      animatePlayer();
  }
  if (KEY_EVENTS.rightArrow) {
      movePlayer(GAME_CONFIG.characterSpeed, 0, -1);
      animatePlayer();
  }
  if (KEY_EVENTS.upArrow) {
      movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);
      animatePlayer();
  }
  if (KEY_EVENTS.downArrow) {
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

    PLAYER.box.style.position = "absolute"; 
    PLAYER.box.style.left = newX + "px";
    PLAYER.box.style.top = newY + "px";

    if (dr !== 0 && dr !== PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `scaleX(${-dr})`;
    }
}

function animatePlayer() {
    if (PLAYER.spriteImgNumber < 7) {
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += PLAYER.spriteMovement
        PLAYER.spriteImg.style.right = x + "%";
    } else {
        PLAYER.spriteImg.style.right = PLAYER.spriteResetPoint + "%" ;
        PLAYER.spriteImgNumber = 0;
    }
}
function skinSelect(index) {
    switch (index) {
      case 0:
        PLAYER.skin = "../images/Player/Shinobi";
        PLAYER.spriteMovement = 230.5
        PLAYER.spriteResetPoint = 33;
        document.getElementById('spriteImg').style.right = "33";
        break;
      case 1:
        PLAYER.skin = "../images/Player/Samurai";
        PLAYER.spriteMovement = 227.6
        PLAYER.spriteResetPoint = 22
        document.getElementById('spriteImg').style.right = "24";

        break;
      case 2:
        PLAYER.skin = "../images/Player/Fighter";
        PLAYER.spriteMovement = 230.5
        PLAYER.spriteResetPoint = 48;
        document.getElementById('spriteImg').style.right = "48";
        break;
      default:
        throw new Error('Invalid index');
    }
    try {
      document.getElementById('spriteImg').src = PLAYER.skin + "/Run.png";
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
      <h2>So spielst du</h2>
      <p>Benutze WASD um den Spieler zu steuern</p>
      <p>Du kannst während du SHIFT gedrückt hältst sprinten</p>
      <p>Drücke SPACE um in den Leveln zu springen</p>
      <p>Drücke ESC um das Level zu pausieren</p>
      <p>Benütze den Shop um die gesammelten Münzen für Boosts auszugeben</p>
      <button onclick="howToPlay()">Schließen</button>
      `
      howToPlay.innerHTML = howToPlayText
    }
    else{
      howToPlay.style.display = "none"
    }
  }
