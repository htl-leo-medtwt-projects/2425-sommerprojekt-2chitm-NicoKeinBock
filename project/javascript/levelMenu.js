let PLAYER = {
  playerMenu: document.getElementById('player'),
  playerLevel1: document.getElementById('player1'),
  playerLevel2: document.getElementById('player2'),
  playerLevel3: document.getElementById('player3'),
  spriteImg: document.getElementById('spriteImg'),
  spriteImg1: document.getElementById('spriteImg1'),
  spriteImg2: document.getElementById('spriteImg2'),
  spriteImg3: document.getElementById('spriteImg3'),
  spriteMovement: 0,
  spriteImgNumber: 1,
  spriteDirection: 1,
  spriteResetPoint: 0,
  tokenCount: getTotalCoins(),
  skin: "",
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
  shopEntrance: document.getElementById('shopEntrance'),
  startseite: document.getElementById('startseite')

}
let UPGRADES = {
  jumpBoostLevel1: false,
  jumpBoostLevel2: false,
  jumpBoostLevel3: false,
  slowFallingLevel1: false,
  slowFallingLevel: false,
  slowFallingLevel3: false,
}
function gameLoop() {
  console.log('Gameloop running')
  if (GAME_STATE !== "menu") return;
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
  if (KEY_EVENTS.shift) {
    GAME_CONFIG.characterSpeed = 10;
  }
  else {
    GAME_CONFIG.characterSpeed = 5;
  }
  gameLoopTimeout = setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}
function movePlayer(dx, dy, dr) {
  let rect = PLAYER.playerMenu.getBoundingClientRect();
  let newX = rect.left + dx;
  let newY = rect.top + dy;

  const FIELD_WIDTH = window.innerWidth
  const FIELD_HEIGHT = window.innerHeight

  if (newX < 0) newX = 0;
  if (newX + rect.width > FIELD_WIDTH) newX = FIELD_WIDTH - rect.width;
  if (newY < 0) newY = 0;
  if (newY + rect.height > FIELD_HEIGHT) newY = FIELD_HEIGHT - rect.height;

  PLAYER.playerMenu.style.position = "absolute";
  PLAYER.playerMenu.style.left = newX + "px";
  PLAYER.playerMenu.style.top = newY + "px";

  if (dr !== 0 && dr !== PLAYER.spriteDirection) {
    PLAYER.spriteDirection = dr;
    PLAYER.playerMenu.style.transform = `scaleX(${-dr})`;
  }
}

function animatePlayer() {
  if (PLAYER.spriteImgNumber < 8) {
    PLAYER.spriteImgNumber += 1;
  } else {
    PLAYER.spriteImgNumber = 1;
  }
  document.getElementById('spriteImg').src = PLAYER.skin + "/running/sprite_" + PLAYER.spriteImgNumber + ".png";
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
    PLAYER.spriteImg.src = PLAYER.skin + "/running/sprite_1.png";
    PLAYER.spriteImg1.src = PLAYER.skin + "/running/sprite_1.png";
    PLAYER.spriteImg2.src = PLAYER.skin + "/running/sprite_1.png";
    PLAYER.spriteImg3.src = PLAYER.skin + "/running/sprite_1.png";

    PLAYER.spriteImg1
  } catch (error) {
    console.error('Error updating sprite image:', error);
  }
  document.getElementById('playerSelection').style.display = "none";
  localStorage.setItem('skin', PLAYER.skin);
  MAP.map.style.display = "block";
  gameLoop();
}
function howToPlay() {
  var howToPlay = document.getElementById('howToPlay')
  if (howToPlay.style.display === "none") {
    howToPlay.style.display = "block"
    let howToPlayText = `
              <canvas id="canvas-howTo"></canvas>
      <div id= "howToText">
      <h2>So spielst du</h2>
      <h3>Steuerung:</h3>
      <p>Benutze WASD um den Spieler zu steuern</p>
      <p>Du kannst während du SHIFT gedrückt hältst sprinten</p>
      <p>Drücke SPACE um in den Leveln zu springen</p>
      <p>Drücke ESC um das Level zu pausieren</p>
      <p>Benütze den Shop um die gesammelten Münzen für Boosts auszugeben</p>
      </div>
      `
    howToPlay.innerHTML = howToPlayText
    var granimInstance = new Granim({
      element: '#canvas-howTo',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#00ffcc', '#7aff38'],
            ['#7aff38', '#0575E6'],
            ['#7bcbee', '#00ffcc']
          ]
        }
      }
    });
    document.getElementById('canvas-howTo').style.display = "block"

  }
  else {
    howToPlay.style.display = "none"
  }
}
function checkForCollisionsWithLevelEntrance() {
  if (isColliding(PLAYER.playerMenu, MAP.level1Entrance, 0)) {
    console.log("Level 1 Entrance");
    document.getElementById('level1Entrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um Level 1 zu betreten</p>
      `
    if (KEY_EVENTS.e) {
      console.log("Entered IF")
      enterLevel1()
    }
  }
  else if (isColliding(PLAYER.playerMenu, MAP.level2Entrance, 0)) {
    console.log("Level 2 Entrance");
    document.getElementById('level2Entrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um Level 2 zu betreten</p>
      `
    if (KEY_EVENTS.e) {
      console.log("Entered IF")
      enterLevel2()
    }
  }
  else if (isColliding(PLAYER.playerMenu, MAP.level3Entrance, 0)) {
    console.log("Level 3 Entrance");
    document.getElementById('level3Entrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um Level 3 zu betreten</p>
      `
  }
  else if (isColliding(PLAYER.playerMenu, MAP.shopEntrance, 0)) {
    console.log("Shop Entrance");
    document.getElementById('shopEntrance').innerHTML = `
      <p class="LevelEntranceText">Drücke E um den Shop zu betreten</p>
      `
    if (KEY_EVENTS.e) {
      console.log("Entered IF")
      enterShop()
    }
  }
  else {
    document.getElementById('level1Entrance').innerHTML = ''
    document.getElementById('level2Entrance').innerHTML = ''
    document.getElementById('level3Entrance').innerHTML = ''
    document.getElementById('shopEntrance').innerHTML = ''
  }
}
function enterLevel1() {
  GAME_STATE = "level1";
  clearTimeout(gameLoopTimeout);
  GAME_CONFIG.characterSpeed = 5;
  MAP.map.style.display = "none";
  document.getElementById("level1").style.display = "block";
  MAP.startseite.style.display = "none";
  updateLevel1();
  startLevel1();
}

function enterLevel2() {
  GAME_STATE = "level2";
  clearTimeout(gameLoopTimeout);
  GAME_CONFIG.characterSpeed = 5;
  MAP.map.style.display = "none";
  document.getElementById("level2").style.display = "block";
  MAP.startseite.style.display = "none";
  updateLevel2();
  startLevel2();
}
function enterLevel3() {
  MAP.map.style.display = "none";
  document.getElementById('level3').style.display = "block";
}
function enterShop() {
  document.getElementById('shop').style.display = "block";
  document.getElementById('coinCounter').innerHTML = PLAYER.tokenCount + ' Coins';
  var granimInstance2 = new Granim({
    element: '#canvas-shop',
    direction: 'left-right',
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
          ['#00ffcc', '#7aff38'],
          ['#7aff38', '#0575E6'],
          ['#7bcbee', '#00ffcc']
        ]
      }
    }
  });
}
function leaveShop() {
  document.getElementById('shop').style.display = "none"
}
function buyItem(itemId) {
  const button = document.getElementById(`buy-${itemId}`);
  const originalText = button.getAttribute('data-original-text');
  let cost = 0;


  switch (itemId) {
    case 'jumpBoost1': cost = 25; break;
    case 'jumpBoost2': cost = 250; break;
    case 'jumpBoost3': cost = 1000; break;
    case 'slowFalling1': cost = 50; break;
    case 'slowFalling2': cost = 300; break; 
    case 'slowFalling3': cost = 750; break;
  }

  if (PLAYER.tokenCount < cost) {
    button.textContent = 'Nicht genug Coins';
    button.style.border = '2px solid red';
    button.style.boxShadow = '0 0 10px red';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.border = '';
      button.style.boxShadow = '';
    }, 1000);
  } else {
    PLAYER.tokenCount -= cost;
    document.getElementById('coinCounter').innerHTML = PLAYER.tokenCount + ' Coins';
    button.textContent = 'Gekauft!';
    button.style.border = '';
    button.style.boxShadow = '';
    button.style.opacity = '0.5';
    button.disabled = true;
    button.style.cursor = 'not-allowed';
    switch (itemId) {
      case 'jumpBoost1': gravity1 = window.innerHeight * 0.00095; console.log('bought grav1'); break;
      case 'jumpBoost2': ; gravity2 = window.innerHeight * 0.0011;console.log('bought grav2');
      case 'jumpBoost3': cost = 1000; break;
      case 'slowFalling1': maxFallSpeed1 = window.innerHeight * 0.006; console.log('bought slowFa1'); break;
      case 'slowFalling2': maxFallSpeed2 = window.innerHeight * 0.006; console.log('bought slowFa2'); break;
      case 'slowFalling3': cost = 750; break;
    }
  }
  saveTotalCoins(PLAYER.tokenCount)
}




document.getElementById('coinCounter').innerHTML = PLAYER.tokenCount + ' Coins';


