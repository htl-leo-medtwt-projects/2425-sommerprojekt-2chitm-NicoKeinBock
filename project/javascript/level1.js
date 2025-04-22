
const PLAYER_LEVEL1 = {
    playerMenu: document.getElementById("player1"),
    spriteImg: document.getElementById("spriteImg1"),
    highscore: 0,
    highscoreText: "",
    newCoins: 0
};
let stopwatchText
let startTime = null;
let elapsedTime = 0;
let intervalId = null;
// gravtationslogik ergoogelt, aber selbst programmiert
let player1VelocityY = 0;
let isJumping = false;
const GAME_LOOP_INTERVAL = 16;
let hasTouchedBox16 = false;
let deathCounter = 0

function startLevel1() {
    GAME_CONFIG.characterSpeed = 5;
    startStopwatch();
}

function updateLevel1() {
    const gravity = window.innerHeight * 0.0006;
    const maxFallSpeed = window.innerHeight * 0.8;

    if (KEY_EVENTS.leftArrow) {
        movePlayerLevel1(-1 * GAME_CONFIG.characterSpeed, 0, 1);
        if (!isJumping) {
            animatePlayerLevel1();
        }
    }

    if (KEY_EVENTS.rightArrow) {
        movePlayerLevel1(GAME_CONFIG.characterSpeed, 0, -1);
        if (!isJumping) {
            animatePlayerLevel1();
        }
    }

    if (KEY_EVENTS.shift) {
        GAME_CONFIG.characterSpeed = 10;
    } else {
        GAME_CONFIG.characterSpeed = 5;
    }

    if (KEY_EVENTS.space && !isJumping) {
        player1VelocityY = -window.innerHeight * 0.025; // Responsive jump
        isJumping = true;
    }

    player1VelocityY += gravity;
    if (player1VelocityY > maxFallSpeed) player1VelocityY = maxFallSpeed;

    movePlayerLevel1(0, player1VelocityY, 0);

    const playerRect = PLAYER_LEVEL1.playerMenu.getBoundingClientRect();
    const levelBox = document.getElementById("level1Box1");

    if (levelBox) {
        const boxRect = levelBox.getBoundingClientRect();
        if (playerRect.bottom > boxRect.bottom) {
            deathCounter++;
            resetPlayerLevel1();
            showDeathFlash();
            updateDeathCounter(deathCounter);
            startTime = startTime - 5000;
        }
    }

    const levelBox16 = document.getElementById("level1Box15");
    if (levelBox16 && !hasTouchedBox16) {
        const box16Rect = levelBox16.getBoundingClientRect();
        if (
            playerRect.right > box16Rect.left &&
            playerRect.left < box16Rect.right &&
            playerRect.bottom > box16Rect.top - 5 &&
            playerRect.top < box16Rect.bottom
        ) {
            hasTouchedBox16 = true;
            showWinningFlash();
            stopStopwatch();
        }
    }

    if (isTouchingGround(PLAYER_LEVEL1.playerMenu) && player1VelocityY > 0) {
        const playerHeight = PLAYER_LEVEL1.playerMenu.offsetHeight;
        PLAYER_LEVEL1.playerMenu.style.top = (window.innerHeight - playerHeight) * 100 / window.innerHeight + "vh";
        player1VelocityY = 0;
        isJumping = false;
    }

    level1Timeout = setTimeout(updateLevel1, GAME_LOOP_INTERVAL);
}


function movePlayerLevel1(dx, dy, dr) {
    let moveX = dx;
    let moveY = dy;

    if (isCollidingWithBox(PLAYER_LEVEL1.playerMenu, dx, 0)) {
        moveX = 0;
    }

    if (isCollidingWithBox(PLAYER_LEVEL1.playerMenu, 0, dy)) {
        moveY = 0;
        if (dy > 0) {
            isJumping = false;
            player1VelocityY = 0;
        }
    }

    const FIELD_WIDTH = window.innerWidth;
    const FIELD_HEIGHT = window.innerHeight;

    let currentLeftPx = PLAYER_LEVEL1.playerMenu.offsetLeft;
    let currentTopPx = PLAYER_LEVEL1.playerMenu.offsetTop;

    let newX = currentLeftPx + moveX;
    let newY = currentTopPx + moveY;

    const width = PLAYER_LEVEL1.playerMenu.offsetWidth;
    const height = PLAYER_LEVEL1.playerMenu.offsetHeight;

    if (newX < 0) newX = 0;
    if (newX + width > FIELD_WIDTH) newX = FIELD_WIDTH - width;
    if (newY < 0) newY = 0;
    if (newY + height > FIELD_HEIGHT) newY = FIELD_HEIGHT - height;

    // Convert pixel values to vw/vh
    const leftInVw = (newX / FIELD_WIDTH) * 100;
    const topInVh = (newY / FIELD_HEIGHT) * 100;

    PLAYER_LEVEL1.playerMenu.style.left = `${leftInVw}vw`;
    PLAYER_LEVEL1.playerMenu.style.top = `${topInVh}vh`;

    if (dr !== 0 && dr !== PLAYER_LEVEL1.spriteDirection) {
        PLAYER_LEVEL1.spriteDirection = dr;
        PLAYER_LEVEL1.playerMenu.style.transform = `scaleX(${-dr})`;
    }
}


function isTouchingGround(playerElement) {
    const playerRect = playerElement.getBoundingClientRect();
    const tolerance = 2;
    return (playerRect.bottom >= window.innerHeight - tolerance);
}
function animatePlayerLevel1() {
    if (PLAYER.spriteImgNumber < 8) {
        PLAYER.spriteImgNumber += 1;
    } else {
        PLAYER.spriteImgNumber = 1;
    }
    document.getElementById('spriteImg1').src = PLAYER.skin + "/running/sprite_" + PLAYER.spriteImgNumber + ".png";
}


function isCollidingWithBox(playerElement, dx, dy) {
    const playerRect = playerElement.getBoundingClientRect();
    const boxes = document.querySelectorAll(".Level1JumpBox");

    for (let box of boxes) {
        const boxRect = box.getBoundingClientRect();

        const futurePlayerRect = {
            left: playerRect.left + dx,
            right: playerRect.right + dx,
            top: playerRect.top + dy,
            bottom: playerRect.bottom + dy
        };

        const horizontalOverlap =
            futurePlayerRect.right > boxRect.left &&
            futurePlayerRect.left < boxRect.right;

        const verticalOverlap =
            futurePlayerRect.bottom > boxRect.top &&
            futurePlayerRect.top < boxRect.bottom;

        if (horizontalOverlap && verticalOverlap) {
            return true;
        }
    }

    return false;
}

function resetPlayerLevel1() {
    player1VelocityY = 0;
    isJumping = false;
    PLAYER_LEVEL1.playerMenu.style.top = "60vh";
    PLAYER_LEVEL1.playerMenu.style.left = "5vw";
}

function showDeathFlash() {
    const flash = document.getElementById("deathFlash");
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 150);
}

function showWinningFlash() {
    const flash = document.getElementById("winFlash");
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 150);
    displayLevel1ResultScreen()
}
function updateDeathCounter(deathCount) {
    const deathCounter = document.getElementById("deathCounter");
    const deathCounterText = document.getElementById("deathCounterText");

    if (deathCounterText) {
        deathCounterText.textContent = deathCount;
    } else {
        deathCounter.innerHTML = `
            <img src="../Images/skull.png" alt="skull">
            <p id="deathCounterText">${deathCount}</p>
        `;
    }
}
updateDeathCounter(deathCounter);

function startStopwatch() {
    if (startTime === null) {
      startTime = new Date().getTime();
      
      intervalId = setInterval(updateStopwatch, 10);
    } else {
      clearInterval(intervalId);
      intervalId = null;
      startTime = null;
    }
  }
  
  function updateStopwatch() {
    const currentTime = new Date().getTime();
    elapsedTime = (currentTime - startTime) / 1000;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);
    const milliseconds = Math.floor((elapsedTime % 1) * 100);
     stopwatchText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    document.getElementById('stopwatch').innerHTML = stopwatchText;
  }
  
  function resetStopwatch() {
    clearInterval(intervalId);
    intervalId = null;
    startTime = null;
    elapsedTime = 0;
    document.getElementById('stopwatch').innerHTML = '00:00:00';
  }
  
  function stopStopwatch() {
    clearInterval(intervalId);
    intervalId = null;
  }
  resetStopwatch()
 
  function createGrassPlattform(id) {
    const plattform = document.createElement('img');
    plattform.src = '../Images/grassPlattform.png';
    plattform.alt = '';
    plattform.className = 'Level1JumpBox';
    plattform.id = `level1Box${id}`;
    return plattform;
  }
  const level1 = document.getElementById('level1');
const anzahlPlattforms = 16; 

for (let i = 1; i < anzahlPlattforms; i++) {
  const plattform = createGrassPlattform(i);
  level1.appendChild(plattform);
}
function checkHighscore() {
    const oldHighscore = localStorage.getItem('highscore');
    const oldHighscoreText = localStorage.getItem('highscoreText')
    const newScore = elapsedTime;
    const newScoreText = stopwatchText
  
    if (oldHighscore === null || newScore < oldHighscore) {
      localStorage.setItem('highscore', newScore);
      localStorage.setItem('highscoreText', newScoreText);

      PLAYER_LEVEL1.highscore = newScore
      PLAYER_LEVEL1.highscoreText = newScoreText
    } else {
        PLAYER_LEVEL1.highscore = oldHighscore;
        PLAYER_LEVEL1.highscoreText = oldHighscoreText;
    }
  }
  function displayLevel1ResultScreen(){
    checkHighscore();
    calculateCoinsFromTime(); 
    let winscreen1 = document.createElement('div');
    winscreen1.id = 'winscreen1';
    winscreen1.innerHTML = `
        <h2 class = "levelCompletedText">LEVEL 1 ABGESCHLOSSEN</h2>
        <h3>Zeit: ${stopwatchText}</h3>
        <h3>Highscore: ${PLAYER_LEVEL1.highscoreText}</h3>
        <h3>Münzen: ${PLAYER_LEVEL1.newCoins}</h3>
        <div id="playAgainButton" class = "level1Buttons" onclick="playAgain()"><p>Spiel wiederholen</p></div>
        <div id="backToMenuButton" class = "level1Buttons" onclick="backToMenu()"><p>Zurück zum Menü</p> </div>
    `;
    document.getElementById('level1').appendChild(winscreen1);
}
function calculateCoinsFromTime() {
    const time = elapsedTime; 
    let coinsGathered = Math.max(1, Math.round(100 / time)); // Math.max verhindert das man weniger als eine Münze bekommt
    PLAYER_LEVEL1.newCoins += coinsGathered;
}
function playAgain() {
    PLAYER_LEVEL1.playerMenu.style.top = "60vh";
    PLAYER_LEVEL1.playerMenu.style.left = "5vw";
    player1VelocityY = 0;
    isJumping = false;
    resetStopwatch();
    deathCounter = 0;
    updateDeathCounter(deathCounter);
    GAME_CONFIG.characterSpeed = 5;
    const winFlash = document.getElementById("winFlash");
    winFlash.style.opacity = "0";
    const winscreen1 = document.getElementById("winscreen1");
    winscreen1.remove();
    hasTouchedBox16 = false;
    startStopwatch()
  }
  function backToMenu() {
    stopStopwatch();
    resetStopwatch();
    PLAYER_LEVEL1.playerMenu.style.top = "60vh";
    PLAYER_LEVEL1.playerMenu.style.left = "5vw";
    player1VelocityY = 0;
    isJumping = false;
    deathCounter = 0;
    updateDeathCounter(deathCounter);
    const winscreen1 = document.getElementById("winscreen1");
    if (winscreen1) {
        winscreen1.remove();
    }
    hasTouchedBox16 = false;
    document.getElementById("level1").style.display = "none";
    GAME_STATE = "menu";
    gameLoop()
    GAME_CONFIG.characterSpeed = 5;
    MAP.map.style.display = "block";
    MAP.startseite.style.display = "block"
    clearTimeout(level1Timeout);
  }
