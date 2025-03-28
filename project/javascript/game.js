let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    tokenCount: 0
}
let MAP = {
    map: document.getElementById('map'),
    level1: document.getElementById() ,
    level2: document.getElementById(),
    level3: document.getElementById(),

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
    GAME_SCREEN.debug_output.innerHTML = `x: ${PLAYER.box.style.left} | y: ${PLAYER.box.style.top} | direction: ${dr} | animation: ${PLAYER.spriteImgNumber} | count: ${PLAYER.coinCount}`;
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
