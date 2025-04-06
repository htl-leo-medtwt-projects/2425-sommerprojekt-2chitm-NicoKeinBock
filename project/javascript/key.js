let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false,
    space: false,
    shift: false,
};

document.addEventListener("keydown", keyListenerDown);
document.addEventListener("keyup", keyListenerUp);

function keyListenerDown(e) {
    console.log("Key pressed:", e.key); 
    
    if (e.key == "a") {
        KEY_EVENTS.leftArrow = true;
        console.log('left')
    }
    if (e.key == "w") {
        KEY_EVENTS.upArrow = true;
    }
    if (e.key == "d") {
        KEY_EVENTS.rightArrow = true;
    }
    if (e.key == "s") {
        KEY_EVENTS.downArrow = true;
    }
    if (e.key == "Space") {
        KEY_EVENTS.space = true;
    }
    if (e.key == "Shift") {
        KEY_EVENTS.shift = true;
    }
}

function keyListenerUp(e) {
    if (e.key === "a") {
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === "w") {
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === "d") {
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === "s") {
        KEY_EVENTS.downArrow = false;
    }
    if (e.key === "Space") {
        KEY_EVENTS.space = false;
    }
    if (e.key ==="Shift") {
        KEY_EVENTS.shift = false;
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