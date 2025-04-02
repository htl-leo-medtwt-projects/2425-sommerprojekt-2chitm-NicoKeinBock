let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    tokenCount: 0,
    skin: ""
}
let MAP = {
    map: document.getElementById('gameMap'),
    level1: document.getElementById('') ,
    level2: document.getElementById(''),
    level3: document.getElementById(''),

}
function gameLoop() {
  console.log('Game Loop Running');
  if (KEY_EVENTS.leftArrow) {
      movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, -1);
      animatePlayer();
  }
  if (KEY_EVENTS.rightArrow) {
      movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
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

  gameLoopTimeout = setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}
function movePlayer(dx, dy, dr) {
    // save original position
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    // calculate new position
    PLAYER.box.style.left = (originalX + dx) + 'vw';
    PLAYER.box.style.top = (originalY + dy) + 'vh';

    // update sprite direction if needed
    if (dr != 0 && dr != PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `scaleX(${-dr})`; // Flip the sprite direction
    }
}
function animatePlayer() {
    if (PLAYER.spriteImgNumber < 3) {
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += 64.0;
        PLAYER.spriteImg.style.right = x + "px";
    } else {
        PLAYER.spriteImg.style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
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
      document.getElementById('spriteImg').src = PLAYER.skin + "/Idle.png";
    } catch (error) {
      console.error('Error updating sprite image:', error);
    }
    document.getElementById('playerSelection').style.display = "none";
    MAP.map.style.display = "block";
  }

