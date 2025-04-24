const PLAYER_LEVEL2 = {
    playerMenu: document.getElementById("player2"),
    spriteImg: document.getElementById("spriteImg2"),
    highscore: 0,
    highscoreText: "",
    newCoins: 0,
    spriteImgNumber: 1,
    spriteDirection: 1,
    skin: "../Images/Skins/default"
};

let stopwatchText2;
let startTime2 = null;
let elapsedTime2 = 0;
let intervalId2 = null;
let level2Timeout = null;

let player2VelocityY = 0;
let isJumping2 = false;
const GAME_LOOP_INTERVAL2 = 16;
let hasTouchedLevel2Box16 = false;
let deathCounter2 = 0;

function startLevel2() {
    GAME_CONFIG.characterSpeed = 3;
    startStopwatch2();
    updateLevel2();
}

function updateLevel2() {
    const gravity = window.innerHeight * 0.0011;
    const maxFallSpeed = window.innerHeight * 0.8;

    if (KEY_EVENTS.leftArrow) {
        movePlayerLevel2(-1 * GAME_CONFIG.characterSpeed, 0, 1);
        if (!isJumping2) {
            animatePlayerLevel2();
        }
    }

    if (KEY_EVENTS.rightArrow) {
        movePlayerLevel2(GAME_CONFIG.characterSpeed, 0, -1);
        if (!isJumping2) {
            animatePlayerLevel2();
        }
    }

    if (KEY_EVENTS.shift) {
        GAME_CONFIG.characterSpeed = 6;
    } else {
        GAME_CONFIG.characterSpeed = 3;
    }
     
    if (KEY_EVENTS.space && !isJumping2) {
        player2VelocityY = -window.innerHeight * 0.025;
        isJumping2 = true;
    }

    player2VelocityY += gravity;
    if (player2VelocityY > maxFallSpeed) player2VelocityY = maxFallSpeed;

    movePlayerLevel2(0, player2VelocityY, 0);

    const playerRect = PLAYER_LEVEL2.playerMenu.getBoundingClientRect();
    const levelBox = document.getElementById("level2Box1");

    if (levelBox) {
        const boxRect = levelBox.getBoundingClientRect();
        if (playerRect.bottom > boxRect.bottom) {
            deathCounter2++;
            resetPlayerLevel2();
            showDeathFlash();
            updateDeathCounter2(deathCounter2);
            startTime2 = startTime2 - 5000;
        }
    }

    const level2Box16 = document.getElementById("level2Box15");
    if (level2Box16 && !hasTouchedLevel2Box16) {
        const rect = level2Box16.getBoundingClientRect();
        if (
            playerRect.right > rect.left &&
            playerRect.left < rect.right &&
            playerRect.bottom > rect.top - 5 &&
            playerRect.top < rect.bottom
        ) {
            hasTouchedLevel2Box16 = true;
            showWinningFlash2();
            stopStopwatch2();
        }
    }

    if (isTouchingGround2(PLAYER_LEVEL2.playerMenu) && player2VelocityY > 0) {
        const playerHeight = PLAYER_LEVEL2.playerMenu.offsetHeight;
        PLAYER_LEVEL2.playerMenu.style.top = ((window.innerHeight - playerHeight) * 100 / window.innerHeight) + "vh";
        player2VelocityY = 0;
        isJumping2 = false;
    }

    level2Timeout = setTimeout(updateLevel2, GAME_LOOP_INTERVAL2);
}

function movePlayerLevel2(dx, dy, dr) {
    let moveX = dx;
    let moveY = dy;

    if (isCollidingHorizontally(PLAYER_LEVEL2.playerMenu, dx)) {
        moveX = 0;
    }

    if (isCollidingVertically(PLAYER_LEVEL2.playerMenu, dy)) {
        moveY = 0;
        if (dy > 0) {
            isJumping2 = false;
            player2VelocityY = 0;
        }
    }

    const FIELD_WIDTH = window.innerWidth;
    const FIELD_HEIGHT = window.innerHeight;

    let currentLeftPx = PLAYER_LEVEL2.playerMenu.offsetLeft;
    let currentTopPx = PLAYER_LEVEL2.playerMenu.offsetTop;

    let newX = currentLeftPx + moveX;
    let newY = currentTopPx + moveY;

    const width = PLAYER_LEVEL2.playerMenu.offsetWidth;
    const height = PLAYER_LEVEL2.playerMenu.offsetHeight;

    if (newX < 0) newX = 0;
    if (newX + width > FIELD_WIDTH) newX = FIELD_WIDTH - width;
    if (newY < 0) newY = 0;
    if (newY + height > FIELD_HEIGHT) newY = FIELD_HEIGHT - height;

    const leftInVw = (newX / FIELD_WIDTH) * 100;
    const topInVh = (newY / FIELD_HEIGHT) * 100;

    PLAYER_LEVEL2.playerMenu.style.left = `${leftInVw}vw`;
    PLAYER_LEVEL2.playerMenu.style.top = `${topInVh}vh`;

    if (dr !== 0 && dr !== PLAYER_LEVEL2.spriteDirection) {
        PLAYER_LEVEL2.spriteDirection = dr;
        PLAYER_LEVEL2.playerMenu.style.transform = `scaleX(${-dr})`;
    }
}


function isTouchingGround2(playerElement) {
    const rect = playerElement.getBoundingClientRect();
    return (rect.bottom >= window.innerHeight - 2);
}

function animatePlayerLevel2() {
    if (PLAYER.spriteImgNumber < 8) {
        PLAYER.spriteImgNumber += 1;
    } else {
        PLAYER.spriteImgNumber = 1;
    }
    document.getElementById('spriteImg2').src = PLAYER.skin + "/running/sprite_" + PLAYER.spriteImgNumber + ".png";
}

function isCollidingHorizontally(playerElement, dx) {
    const tolerance = 3;
    const playerRect = playerElement.getBoundingClientRect();
    const boxes = document.querySelectorAll(".Level2JumpBox");

    for (let box of boxes) {
        const rect = box.getBoundingClientRect();

        const futureRect = {
            left: playerRect.left + dx,
            right: playerRect.right + dx,
            top: playerRect.top + tolerance,
            bottom: playerRect.bottom - tolerance
        };

        const hOverlap = futureRect.right > rect.left && futureRect.left < rect.right;
        const vOverlap = futureRect.bottom > rect.top && futureRect.top < rect.bottom;

        if (hOverlap && vOverlap) return true;
    }

    return false;
}

function isCollidingVertically(playerElement, dy) {
    const tolerance = 2;
    const playerRect = playerElement.getBoundingClientRect();
    const boxes = document.querySelectorAll(".Level2JumpBox");

    for (let box of boxes) {
        const rect = box.getBoundingClientRect();

        const futureRect = {
            left: playerRect.left + tolerance,
            right: playerRect.right - tolerance,
            top: playerRect.top + dy,
            bottom: playerRect.bottom + dy
        };

        const hOverlap = futureRect.right > rect.left && futureRect.left < rect.right;
        const vOverlap = futureRect.bottom > rect.top && futureRect.top < rect.bottom;

        if (hOverlap && vOverlap) return true;
    }

    return false;
}



function resetPlayerLevel2() {
    player2VelocityY = 0;
    isJumping2 = false;
    PLAYER_LEVEL2.playerMenu.style.top = "75vh";
    PLAYER_LEVEL2.playerMenu.style.left = "22vw";
}

function showWinningFlash2() {
    const flash = document.getElementById("winFlash");
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 150);
    displayLevel2ResultScreen();
}

function updateDeathCounter2(deathCount) {
    const deathCounter = document.getElementById("deathCounter2");
    const text = document.getElementById("deathCounterText2");

    if (text) {
        text.textContent = deathCount;
    } else {
        deathCounter.innerHTML = `
            <img src="../Images/skull.png" alt="skull">
            <p id="deathCounterText">${deathCount}</p>
        `;
    }
}

updateDeathCounter2(deathCounter2);

function startStopwatch2() {
    if (startTime2 === null) {
        startTime2 = new Date().getTime();
        intervalId2 = setInterval(updateStopwatch2, 10);
    } else {
        clearInterval(intervalId2);
        intervalId2 = null;
        startTime2 = null;
    }
}

function updateStopwatch2() {
    const currentTime = new Date().getTime();
    elapsedTime2 = (currentTime - startTime2) / 1000;
    const minutes = Math.floor(elapsedTime2 / 60);
    const seconds = Math.floor(elapsedTime2 % 60);
    const milliseconds = Math.floor((elapsedTime2 % 1) * 100);
    stopwatchText2 = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    document.getElementById('stopwatch2').innerHTML = stopwatchText2;
}

function resetStopwatch2() {
    clearInterval(intervalId2);
    intervalId2 = null;
    startTime2 = null;
    elapsedTime2 = 0;
    document.getElementById('stopwatch2').innerHTML = '00:00:00';
}

function stopStopwatch2() {
    clearInterval(intervalId2);
    intervalId2 = null;
}

resetStopwatch2();

function createGrassPlattformLevel2(id) {
    const plattform = document.createElement('img');
    plattform.src = '../Images/stonePlattform.png';
    plattform.alt = '';
    plattform.className = 'Level2JumpBox';
    plattform.id = `level2Box${id}`;
    return plattform;
}

const level2 = document.getElementById('level2');
const anzahlPlattformsLevel2 = 16;
for (let i = 1; i < anzahlPlattformsLevel2; i++) {
    const plattform = createGrassPlattformLevel2(i);
    level2.appendChild(plattform);
}

function checkHighscore2() {
    const oldHighscore2 = localStorage.getItem('highscoreLevel2');
    const oldHighscoreText2 = localStorage.getItem('highscoreText2');
    const newScore = elapsedTime2;
    const newScoreText = stopwatchText2;

    if (oldHighscore2 === null || newScore < oldHighscore2) {
        localStorage.setItem('highscoreLevel2', newScore);
        localStorage.setItem('highscoreText2', newScoreText);
        PLAYER_LEVEL2.highscore = newScore;
        PLAYER_LEVEL2.highscoreText = newScoreText;
    } else {
        PLAYER_LEVEL2.highscore = oldHighscore2;
        PLAYER_LEVEL2.highscoreText = oldHighscoreText2;
    }
}

function displayLevel2ResultScreen() {
    checkHighscore2();
    calculateCoinsFromTime2();
    let winscreen1 = document.createElement('div');
    winscreen1.id = 'winscreen1';
    winscreen1.innerHTML = `
        <h2 class="levelCompletedText">LEVEL 2 ABGESCHLOSSEN</h2>
        <h3>Zeit: ${stopwatchText2}</h3>
        <h3>Highscore: ${PLAYER_LEVEL2.highscoreText}</h3>
        <h3>Münzen: ${PLAYER_LEVEL2.newCoins}</h3>
        <div id="playAgainButton" class="level2Buttons" onclick="playAgain2()"><p>Spiel wiederholen</p></div>
        <div id="backToMenuButton" class="level2Buttons" onclick="backToMenu2()"><p>Zurück zum Menü</p></div>
    `;
    document.getElementById('level2').appendChild(winscreen1);
}

function calculateCoinsFromTime2() {
    const time = elapsedTime2;
    let coinsGathered = Math.max(1, Math.round(100 / time));
    PLAYER_LEVEL2.newCoins += coinsGathered;
}

function playAgain2() {
    resetPlayerLevel2();
    resetStopwatch2();
    deathCounter2 = 0;
    updateDeathCounter2(deathCounter2);
    GAME_CONFIG.characterSpeed = 5;
    document.getElementById("winFlash").style.opacity = "0";
    document.getElementById("winscreen1").remove();
    hasTouchedLevel2Box16 = false;
    startStopwatch2();
}

function backToMenu2() {
    stopStopwatch2();
    resetStopwatch2();
    resetPlayerLevel2();
    deathCounter2 = 0;
    updateDeathCounter2(deathCounter2);
    const winscreen1 = document.getElementById("winscreen1");
    if (winscreen1) winscreen1.remove();
    hasTouchedLevel2Box16 = false;
    document.getElementById("level2").style.display = "none";
    GAME_STATE = "menu";
    gameLoop();
    GAME_CONFIG.characterSpeed = 5;
    MAP.map.style.display = "block";
    MAP.startseite.style.display = "block";
    clearTimeout(level2Timeout);
}
