function toggleSettings() {
    var settingsPopup = document.getElementById("settings-popup");
    if (settingsPopup.style.display === "block") {
        settingsPopup.style.display = "none";
    } else {
        settingsPopup.style.display = "block";
        document.getElementById('gameMenuBox').style.display = "none";
    }
}

   function  toggleGameMap() {
    var gameMap = document.getElementById("gameMap");
    if (gameMap.style.display === "block") {
        gameMap.style.display = "none";
    } else {
        gameMap.style.display = "block";
    }
}

function toggleMenu() {
    var gameMenuBox = document.getElementById("gameMenuBox");
    if (gameMenuBox.style.display === "block") {
        gameMenuBox.style.display = "none";
    } else {
        gameMenuBox.style.display = "block";
    }
}

function toggleSoundImage() {
    var soundImage = document.getElementById("soundImage");
    if (music.paused) {
        soundImage.src = "../images/sound_off.png";
    } else {
        soundImage.src = "../images/sound_on.png";
    }
}
function rotateBox() {
    var box = document.getElementById("settings");
    box.classList.add("rotate");
    setTimeout(function() {
      box.classList.remove("rotate");
    }, 400);
  }
var music = new Audio();
music.src = "../music/index.mp3";
music.loop = true;
music.volume = document.getElementById('musicVolume').value / 100;

document.getElementById('musicVolume').addEventListener('input', changeVolume);

function changeVolume(){
    music.volume = document.getElementById('musicVolume').value / 100;
}

function toggleMusic() {
    if (music.paused) {
        music.play();
        toggleSoundImage();
    } else {
        music.pause();
        toggleSoundImage();
    }
}
let PLAYER_IMAGES = {
    player1: "../images/shinobi.png",
    player2: "../images/samurei.png",
    player3: "../images/fighter.png",
}
function togglePlayerSelection() {
    let box = document.getElementById('playerSelection');
    
    box.innerHTML += `
      <div class="playerSelectionBox" id="playerSelectionBox1">
        <img src="${PLAYER_IMAGES.player1}" class="playerSelectionImage" id="playerSelectionImage1">
      </div>
      <div class="playerSelectionBox" id="playerSelectionBox2">
        <img src="${PLAYER_IMAGES.player2}" class="playerSelectionImage" id="playerSelectionImage2">
      </div>
      <div class="playerSelectionBox" id="playerSelectionBox3">
        <img src="${PLAYER_IMAGES.player3}" class="playerSelectionImage" id="playerSelectionImage3">
      </div>
    `;
    
    box.style.display = "block"
  }
let callCount = 1;

document.getElementById('spielen').addEventListener('click', function() {
 
  if (callCount === 1) {
    callCount++;
    togglePlayerSelection();
  } else if (callCount === 2) {
    toggleGameMap();
  }
});
