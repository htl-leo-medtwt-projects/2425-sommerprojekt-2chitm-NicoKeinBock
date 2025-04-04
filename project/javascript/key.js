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