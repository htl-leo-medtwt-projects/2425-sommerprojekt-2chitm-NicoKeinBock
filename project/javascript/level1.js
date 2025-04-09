// Setup
const PLAYER_LEVEL1 = {
    playerMenu: document.getElementById("player1"),
    spriteImg: document.getElementById("spriteImg1"),
};

let player1VelocityY = 0;
let isJumping = false;

// Game Loop interval
const GAME_LOOP_INTERVAL = 16;

// Start Level
function startLevel1() {
    setTimeout(updateLevel1, GAME_LOOP_INTERVAL);
}

// Main Game Loop
function updateLevel1() {
    // Horizontal Movement
    if (KEY_EVENTS.leftArrow) {
        movePlayerLevel1((-1) * GAME_CONFIG.characterSpeed , 0, 1);
        animatePlayerLevel1();
    }
    if (KEY_EVENTS.rightArrow) {
        movePlayerLevel1(GAME_CONFIG.characterSpeed , 0, -1);
        animatePlayerLevel1();
    }

    // Sprint
    if (KEY_EVENTS.shift) {
        GAME_CONFIG.characterSpeed = 10;
    } else {
        GAME_CONFIG.characterSpeed = 5;
    }

    // Jump
    if (KEY_EVENTS.space && !isJumping) {
        console.log("JUMP!");
        player1VelocityY = -150;
        isJumping = true;
    }

    // Apply gravity
    player1VelocityY += 1;

    // Cap fall speed
    if (player1VelocityY > 20) player1VelocityY = 20;

    // Vertical movement
    movePlayerLevel1(0, player1VelocityY, 0);

    // Ground check — nur wenn er fällt
    if (isTouchingGround(PLAYER_LEVEL1.playerMenu) && player1VelocityY > 0) {
        const playerHeight = PLAYER_LEVEL1.playerMenu.offsetHeight;

        // Snap to ground
        PLAYER_LEVEL1.playerMenu.style.top = (window.innerHeight - playerHeight) + "px";

        player1VelocityY = 0;
        isJumping = false;
    }

    // Continue the game loop using setTimeout
    setTimeout(updateLevel1, GAME_LOOP_INTERVAL);
}

// Movement Function
function movePlayerLevel1(dx, dy, dr) {
    let newX = PLAYER_LEVEL1.playerMenu.offsetLeft + dx;
    let newY = PLAYER_LEVEL1.playerMenu.offsetTop + dy;

    const FIELD_WIDTH = window.innerWidth;
    const FIELD_HEIGHT = window.innerHeight;

    const width = PLAYER_LEVEL1.playerMenu.offsetWidth;
    const height = PLAYER_LEVEL1.playerMenu.offsetHeight;

    // Beschränke Bewegungen innerhalb des Spielfeldes
    if (newX < 0) newX = 0;
    if (newX + width > FIELD_WIDTH) newX = FIELD_WIDTH - width;
    if (newY < 0) newY = 0;
    if (newY + height > FIELD_HEIGHT) newY = FIELD_HEIGHT - height;

    // Überprüfen, ob eine Kollision mit einer Box auftritt und die horizontale Bewegung blockiert werden soll
    if (!isCollidingWithBox(PLAYER_LEVEL1.playerMenu, dx, 0)) { // Horizontaler Check
        PLAYER_LEVEL1.playerMenu.style.position = "absolute";
        PLAYER_LEVEL1.playerMenu.style.left = newX + "px";
    }
    else{
        isJumping = false;
    }

    // Überprüfen, ob der Spieler nicht nach unten durch die Box gehen kann
    if (!isCollidingWithBox(PLAYER_LEVEL1.playerMenu, 0, dy)) { // Vertikaler Check
        PLAYER_LEVEL1.playerMenu.style.top = newY + "px";
    }else{
        isJumping = false;
    }

    if (dr !== 0 && dr !== PLAYER_LEVEL1.spriteDirection) {
        PLAYER_LEVEL1.spriteDirection = dr;
        // Hier die Korrektur der `transform`-Zeile:
        PLAYER_LEVEL1.playerMenu.style.transform = `scaleX(${-dr})`;
    }
}

// Ground Collision
function isTouchingGround(playerElement) {
    const playerRect = playerElement.getBoundingClientRect();
    const tolerance = 2;
    return (playerRect.bottom >= window.innerHeight - tolerance);
}

// Animation
function animatePlayerLevel1() {
    if (PLAYER.spriteImgNumber < 8) {
        PLAYER.spriteImgNumber += 1;
    } else {
        PLAYER.spriteImgNumber = 1;
    }
    document.getElementById('spriteImg1').src = PLAYER.skin + "/running/sprite_" + PLAYER.spriteImgNumber +".png";
}

function isCollidingWithBox(playerElement, dx, dy) {
    const playerRect = playerElement.getBoundingClientRect();
    const boxes = document.querySelectorAll(".Level1JumpBox"); // Alle Boxen der Klasse Level1JumpBox

    for (let box of boxes) {
        const boxRect = box.getBoundingClientRect();

        // Wenn der Spieler sich horizontal bewegt (dx != 0), prüfen wir Kollision in der horizontalen Richtung
        if (dx !== 0) {
            if (dx > 0 && playerRect.right + dx > boxRect.left && playerRect.left < boxRect.left && playerRect.bottom > boxRect.top && playerRect.top < boxRect.bottom) {
                // Der Spieler geht nach rechts und kollidiert mit der Box
                return true;
            } else if (dx < 0 && playerRect.left + dx < boxRect.right && playerRect.right > boxRect.right && playerRect.bottom > boxRect.top && playerRect.top < boxRect.bottom) {
                // Der Spieler geht nach links und kollidiert mit der Box
                return true;
            }
        }

        // Wenn der Spieler sich vertikal bewegt (dy != 0), prüfen wir Kollision in der vertikalen Richtung
        if (dy !== 0) {
            // Wenn der Spieler nach unten fällt (dy > 0), verhindern wir das Durchgehen der Box
            if (dy > 0 && playerRect.bottom + dy > boxRect.top && playerRect.top < boxRect.top && playerRect.right > boxRect.left && playerRect.left < boxRect.right) {
                // Blockiere das Durchgehen von unten
                return true;
            }

            // Wenn der Spieler von oben kommt (dy < 0), erlauben wir ein gewisses Eindringen in die Box
            if (dy < 0 && playerRect.top + dy < boxRect.bottom  && playerRect.bottom > boxRect.bottom && playerRect.right > boxRect.left && playerRect.left < boxRect.right) {
                // Erlaube dem Spieler, bis zu 20 Pixel in die Box einzutauchen, bevor er blockiert wird
                return false; // Spieler kann in die Box "rutschen"
            }
        }
    }

    return false; // Keine Kollision
}
