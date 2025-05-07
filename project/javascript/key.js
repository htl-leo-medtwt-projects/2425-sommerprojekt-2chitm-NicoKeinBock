let KEY_EVENTS = {
  leftArrow: false,
  rightArrow: false,
  upArrow: false,
  downArrow: false,
  space: false,
  shift: false,
  e: false,
  esc: false
};

document.addEventListener("keydown", keyListenerDown);
document.addEventListener("keyup", keyListenerUp);

function keyListenerDown(e) {
  console.log("Key pressed:", e.key);

  if (e.key === "a" || e.key === "A") {
    KEY_EVENTS.leftArrow = true;
  }
  if (e.key === "w" || e.key === "W") {
    KEY_EVENTS.upArrow = true;
  }
  if (e.key === "d" || e.key === "D") {
    KEY_EVENTS.rightArrow = true;
  }
  if (e.key === "s" || e.key === "S") {
    KEY_EVENTS.downArrow = true;
  }
  if (e.key === "Space") {
    KEY_EVENTS.space = true;
  }
  if (e.key === "Shift") {
    KEY_EVENTS.shift = true;
  }
  if (e.key === "e" || e.key === "E") {
    KEY_EVENTS.e = true;
  }
  if (e.code === 'Space') {
    if (GAME_STATE === "level1" && !isJumping) {
      player1VelocityY = -15;
      isJumping = true;
    }
    if (GAME_STATE === "level2" && !isJumping2) {
      player2VelocityY = -15;
      isJumping2 = true;
    }
    e.preventDefault();
  }
  if (e.key === "Esc") {
    KEY_EVENTS.esc = true;
  }

}

function keyListenerUp(e) {
  if (e.key === "a" || e.key === "A") {
    KEY_EVENTS.leftArrow = false;
  }
  if (e.key === "w" || e.key === "W") {
    KEY_EVENTS.upArrow = false;
  }
  if (e.key === "d" || e.key === "D") {
    KEY_EVENTS.rightArrow = false;
  }
  if (e.key === "s" || e.key === "S") {
    KEY_EVENTS.downArrow = false;
  }
  if (e.key === "Space") {
    KEY_EVENTS.space = false;
  }
  if (e.key === "Shift") {
    KEY_EVENTS.shift = false;
  }
  if (e.key === "e" || e.key === "E") {
    KEY_EVENTS.e = false;
    console.log("KEY_EVENTS.e wurde auf false gesetzt");
  }
  if (e.key === "Esc") {
    KEY_EVENTS.esc = false;
  }

}
function isColliding(div1, div2, tolerance = 0) {
  const rect1 = div1.getBoundingClientRect();
  const rect2 = div2.getBoundingClientRect();

  const distanceTop = rect2.top - rect1.bottom;
  const distanceBottom = rect1.top - rect2.bottom;
  const distanceLeft = rect2.left - rect1.right;
  const distanceRight = rect1.left - rect2.right;

  return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);
}