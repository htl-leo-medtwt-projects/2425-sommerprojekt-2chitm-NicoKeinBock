const PLAYER_LEVEL3 = {
    playerMenu: document.getElementById("player3"),
    spriteImg: document.getElementById("spriteImg3"),
    highscore: 0,
    highscoreText: "",
    newCoins: 0,
    spriteImgNumber: 1,
    spriteDirection: 1,
    skin: "../Images/Skins/default"
};

let stopwatchText3;
let startTime3 = null;
let elapsedTime3 = 0;
let intervalId3 = null;
let level3Timeout = null;

let player3VelocityY = 0;
let isJumping3 = false;
const GAME_LOOP_INTERVAL3 = 16;
let hasTouchedLevel3Box16 = false;
let deathCounter3 = 0;

function startLevel3() {
    GAME_CONFIG.characterSpeed = 3;
    startStopwatch3();
}

let gravity3 = window.innerHeight * 0.0014;
let maxFallSpeed3 = window.innerHeight * 0.8;

function updateLevel3() {
    if (KEY_EVENTS.leftArrow) {
        movePlayerLevel3(-1 * GAME_CONFIG.characterSpeed, 0, 1);
        if (!isJumping3) {
            animatePlayerLevel3();
        }
    }

    if (KEY_EVENTS.rightArrow) {
        movePlayerLevel3(GAME_CONFIG.characterSpeed, 0, -1);
        if (!isJumping3) {
            animatePlayerLevel3();
        }
    }

    if (KEY_EVENTS.shift) {
        GAME_CONFIG.characterSpeed = 6;
    } else {
        GAME_CONFIG.characterSpeed = 3;
    }

    if (KEY_EVENTS.space && !isJumping3) {
        player3VelocityY = -window.innerHeight * 0.025;
        isJumping3 = true;
    }

    player3VelocityY += gravity3;
    if (player3VelocityY > maxFallSpeed3) player3VelocityY = maxFallSpeed3;

    movePlayerLevel3(0, player3VelocityY, 0);

    const playerRect = PLAYER_LEVEL3.playerMenu.getBoundingClientRect();
    const levelBox = document.getElementById("level3Box1");

    if (levelBox) {
        const boxRect = levelBox.getBoundingClientRect();
        if (playerRect.bottom > boxRect.bottom) {
            deathCounter3++;
            resetPlayerLevel3();
            showDeathFlash();
            updateDeathCounter3(deathCounter3); 
            startTime3 = startTime3 - 5000;
        }
    }

    const level3Box16 = document.getElementById("level3Box15");
    if (level3Box16 && !hasTouchedLevel3Box16) {
        const rect = level3Box16.getBoundingClientRect();
        if (
            playerRect.right > rect.left &&
            playerRect.left < rect.right &&
            playerRect.bottom > rect.top - 5 &&
            playerRect.top < rect.bottom
        ) {
            hasTouchedLevel3Box16 = true;
            showWinningFlash3();
            stopStopwatch3();
        }
    }

    if (isTouchingGround3(PLAYER_LEVEL3.playerMenu) && player3VelocityY > 0) {
        const playerHeight = PLAYER_LEVEL3.playerMenu.offsetHeight;
        PLAYER_LEVEL3.playerMenu.style.top = ((window.innerHeight - playerHeight) * 100 / window.innerHeight) + "vh";
        player3VelocityY = 0;
        isJumping3 = false;
    }

    level3Timeout = setTimeout(updateLevel3, GAME_LOOP_INTERVAL3);
}

function movePlayerLevel3(dx, dy, dr) {
    let moveX = dx;
    let moveY = dy;

    if (isCollidingHorizontally3(PLAYER_LEVEL3.playerMenu, dx)) {
        moveX = 0;
    }

    if (isCollidingVertically3(PLAYER_LEVEL3.playerMenu, dy)) {
        moveY = 0;
        if (dy > 0) {
            isJumping3 = false;
            player3VelocityY = 0;
        }
    }

    const FIELD_WIDTH = window.innerWidth;
    const FIELD_HEIGHT = window.innerHeight;

    let currentLeftPx = PLAYER_LEVEL3.playerMenu.offsetLeft;
    let currentTopPx = PLAYER_LEVEL3.playerMenu.offsetTop;

    let newX = currentLeftPx + moveX;
    let newY = currentTopPx + moveY;

    const width = PLAYER_LEVEL3.playerMenu.offsetWidth;
    const height = PLAYER_LEVEL3.playerMenu.offsetHeight;

    if (newX < 0) newX = 0;
    if (newX + width > FIELD_WIDTH) newX = FIELD_WIDTH - width;
    if (newY < 0) newY = 0;
    if (newY + height > FIELD_HEIGHT) newY = FIELD_HEIGHT - height;

    const leftInVw = (newX / FIELD_WIDTH) * 100;
    const topInVh = (newY / FIELD_HEIGHT) * 100;

    PLAYER_LEVEL3.playerMenu.style.left = `${leftInVw}vw`;
    PLAYER_LEVEL3.playerMenu.style.top = `${topInVh}vh`;

    if (dr !== 0 && dr !== PLAYER_LEVEL3.spriteDirection) {
        PLAYER_LEVEL3.spriteDirection = dr;
        PLAYER_LEVEL3.playerMenu.style.transform = `scaleX(${-dr})`;
    }
}

function isTouchingGround3(playerElement) {
    const rect = playerElement.getBoundingClientRect();
    return (rect.bottom >= window.innerHeight - 2);
}

function animatePlayerLevel3() {
    if (PLAYER.spriteImgNumber < 8) {  
        PLAYER.spriteImgNumber += 1;
    } else {
        PLAYER.spriteImgNumber = 1;
    }
    document.getElementById('spriteImg3').src = PLAYER.skin + "/running/sprite_" + PLAYER.spriteImgNumber + ".png";  
}

function isCollidingHorizontally3(playerElement, dx) {
    const tolerance = 3;
    const playerRect = playerElement.getBoundingClientRect();
    const boxes = document.querySelectorAll(".Level3JumpBox");  

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

function isCollidingVertically3(playerElement, dy) {
    const tolerance = 2;
    const playerRect = playerElement.getBoundingClientRect();
    const boxes = document.querySelectorAll(".Level3JumpBox"); 

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


function resetPlayerLevel3() {
    player3VelocityY = 0;
    isJumping3 = false;
    PLAYER_LEVEL3.playerMenu.style.top = "75vh";
    PLAYER_LEVEL3.playerMenu.style.left = "48vw";
}

function showWinningFlash3() {
    const flash = document.getElementById("winFlash");
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 150);
    localStorage.setItem('totalwins', (parseInt(localStorage.getItem('totalwins') || '0', 10) + 1).toString());
    displayLevel3ResultScreen();
}

function updateDeathCounter3(deathCount) {
    const deathCounter = document.getElementById("deathCounter3");
    const text = document.getElementById("deathCounterText3");
    localStorage.setItem('totaldeaths', (parseInt(localStorage.getItem('totaldeaths') || '0', 10) + 1).toString());
    if (text) {
        text.textContent = deathCount;
    } else {
        deathCounter.innerHTML = `
            <img src="../Images/skull.png" alt="skull">
            <p id="deathCounterText3">${deathCount}</p>
        `;
    }
}

updateDeathCounter3(deathCounter3);

function startStopwatch3() {
    if (startTime3 === null) {
        startTime3 = new Date().getTime();
        intervalId3 = setInterval(updateStopwatch3, 10);
    } else {
        clearInterval(intervalId3);
        intervalId3 = null;
        startTime3 = null;
    }
}

function updateStopwatch3() {
    const currentTime = new Date().getTime();
    elapsedTime3 = (currentTime - startTime3) / 1000;
    const minutes = Math.floor(elapsedTime3 / 60);
    const seconds = Math.floor(elapsedTime3 % 60);
    const milliseconds = Math.floor((elapsedTime3 % 1) * 100);
    stopwatchText3 = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    document.getElementById('stopwatch3').innerHTML = stopwatchText3;
}

function resetStopwatch3() {
    clearInterval(intervalId3);
    intervalId3 = null;
    startTime3 = null;
    elapsedTime3 = 0;
    document.getElementById('stopwatch3').innerHTML = '00:00:00';
}

function stopStopwatch3() {
    clearInterval(intervalId3);
    intervalId3 = null;
}

resetStopwatch3();

function createGrassPlattformLevel3(id) {
    const plattform = document.createElement('img');
    plattform.src = '../Images/woodenPlattform.png';
    plattform.alt = '';
    plattform.className = 'Level3JumpBox';
    plattform.id = `level3Box${id}`;
    return plattform;
}

const level3 = document.getElementById('level3');
const anzahlPlattformsLevel3 = 16;
for (let i = 1; i < anzahlPlattformsLevel3; i++) {
    const plattform = createGrassPlattformLevel3(i);
    level3.appendChild(plattform);
}

function checkHighscore3() {
    const oldHighscore3 = localStorage.getItem('highscoreLevel3');
    const oldHighscoreText3 = localStorage.getItem('highscoreText3');
    const newScore = elapsedTime3;
    const newScoreText = stopwatchText3;

    if (oldHighscore3 === null || newScore < oldHighscore3) {
        localStorage.setItem('highscoreLevel3', newScore);
        localStorage.setItem('highscoreText3', newScoreText);
        PLAYER_LEVEL3.highscore = newScore;
        PLAYER_LEVEL3.highscoreText = newScoreText;
    } else {
        PLAYER_LEVEL3.highscore = oldHighscore3;
        PLAYER_LEVEL3.highscoreText = oldHighscoreText3;
    }
}

function displayLevel3ResultScreen() {
    checkHighscore3();
    calculateCoinsFromTime3();
    let winscreen1 = document.createElement('div');
    winscreen1.id = 'winscreen3';
    winscreen1.innerHTML = `
        <h2 class="levelCompletedText">LEVEL 3 ABGESCHLOSSEN</h2>
        <h3>Zeit: ${stopwatchText3}</h3>
        <h3>Highscore: ${PLAYER_LEVEL3.highscoreText}</h3>
        <h3>Münzen: ${PLAYER_LEVEL3.newCoins}</h3>
        <div id="playAgainButton" class="level3Buttons" onclick="playAgain3()"><p>Spiel wiederholen</p></div>
        <div id="backToMenuButton" class="level3Buttons" onclick="backToMenu3()"><p>Zurück zum Menü</p></div>
    `;
    document.getElementById('level3').appendChild(winscreen1);
}

function calculateCoinsFromTime3() {
    const time = elapsedTime3;
    let coinsGathered = Math.max(1, Math.round(25000 / time));
    PLAYER_LEVEL3.newCoins += coinsGathered;
}

function playAgain3() {
    resetPlayerLevel3();
    resetStopwatch3();
    deathCounter3 = 0;
    updateDeathCounter3(deathCounter3);
  localStorage.setItem('totalGames',(parseInt(localStorage.getItem('totalGames') || '0', 10) + 1).toString());
    GAME_CONFIG.characterSpeed = 5;
    document.getElementById("winFlash").style.opacity = "0";
    document.getElementById("winscreen3").remove();
    hasTouchedLevel3Box16 = false;
    startStopwatch3();
}

function backToMenu3() {
    stopStopwatch3();
    resetStopwatch3();
    resetPlayerLevel3();
    deathCounter3 = 0;
    updateDeathCounter3(deathCounter3);
    const winscreen1 = document.getElementById("winscreen3");
    if (winscreen1) winscreen1.remove();
    hasTouchedLevel3Box16 = false;
    document.getElementById("level3").style.display = "none";
    GAME_STATE = "menu";
    gameLoop();
    GAME_CONFIG.characterSpeed = 5;
    MAP.map.style.display = "block";
    MAP.startseite.style.display = "block";
    clearTimeout(level3Timeout);
    PLAYER.tokenCount += PLAYER_LEVEL3.newCoins;
    PLAYER_LEVEL3.newCoins = 0;
    document.getElementById('coinCounter').innerHTML = PLAYER.tokenCount + ' Coins';
    saveTotalCoins(PLAYER.tokenCount);
}

function displayBackToMenu3() {
    if (document.getElementById('backToMenuBox3').style.display === "flex") {
        document.getElementById('backToMenuBox3').style.display = "none";
    } else {
        document.getElementById('backToMenuBox3').style.display = "flex";
    }
}
