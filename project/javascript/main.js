let GAME_STATE = "menu";
function toggleSettings() {
  var settingsPopup = document.getElementById("settings-popup");
  if (settingsPopup.style.display === "block") {
    settingsPopup.style.display = "none";
    document.getElementById('canvas-basic').style.display = "none"
  } else {
    document.getElementById('canvas-basic').style.display = "block"
    settingsPopup.style.display = "block";
    var granimInstance = new Granim({
      element: '#canvas-basic',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#00ffcc', '#7aff38'],
            ['#7aff38', '#0575E6'],
            ['#7bcbee', '#00ffcc']
          ]
        }
      }
    });

  }

  document.getElementById('gameMenuBox').style.display = "none";
}

function toggleGameMap() {
  var gameMap = document.getElementById("gameMap");
  if (gameMap.style.display === "block") {
    gameMap.style.display = "none";
  } else {
    gameMap.style.display = "block";
    gameLoop();
  }
}

function toggleMenu() {
  var gameMenuBox = document.getElementById("gameMenuBox");
  if (gameMenuBox.style.display === "block") {
    gameMenuBox.style.display = "none";
  } else {
    gameMenuBox.style.display = "block";
    var granimInstance = new Granim({
      element: '#canvas-settingsMenu',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        "default-state": {
          gradients: [
            ['#00ffcc', '#7aff38'],
            ['#7aff38', '#0575E6'],
            ['#7bcbee', '#00ffcc']
          ]
        }
      }
    });
    document.getElementById('canvas-settingsMenu').style.display = "block"
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
  setTimeout(function () {
    box.classList.remove("rotate");
  }, 400);
}
function rotateBox1() {
  var box = document.getElementById("backToMenuButton1");
  box.classList.add("rotate");
  setTimeout(function () {
    box.classList.remove("rotate");
  }, 400);
}
function rotateBox2() {
  var box = document.getElementById("backToMenuButton2");
  box.classList.add("rotate");
  setTimeout(function () {
    box.classList.remove("rotate");
  }, 400);
}
function rotateBox3() {
  var box = document.getElementById("backToMenuButton3");
  box.classList.add("rotate");
  setTimeout(function () {
    box.classList.remove("rotate");
  }, 400);
}
var music = new Audio();
music.src = "../music/index.mp3";
music.loop = true;
music.volume = document.getElementById('musicVolume').value / 100;

document.getElementById('musicVolume').addEventListener('input', changeVolume);

function changeVolume() {
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
  
  box.innerHTML = `
          <canvas id="canvas-skinSelect"></canvas>
    <h2>Wähle deinen Skin</h2>
    <div id="skinImageBox">
      <div class="playerSelectionBox" id="playerSelectionBox1" onclick="skinSelect(0)">
        <h2>Shinobi</h2>
        <img src="${PLAYER_IMAGES.player1}" class="playerSelectionImage" id="playerSelectionImage1">
      </div>
      <div class="playerSelectionBox" id="playerSelectionBox2" onclick="skinSelect(1);">
      <h2>Samurai</h2>
        <img src="${PLAYER_IMAGES.player2}" class="playerSelectionImage" id="playerSelectionImage2">
      </div>
      <div class="playerSelectionBox" id="playerSelectionBox3" onclick= "skinSelect(2)">
      <h2>Fighter</h2>
        <img src="${PLAYER_IMAGES.player3}" class="playerSelectionImage" id="playerSelectionImage3">
      </div>
      </div>
    `;
    var granimInstance2 = setTimeout(() => {
      new Granim({
        element: '#canvas-skinSelect',
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
          "default-state": {
            gradients: [
              ['#7aff38', '#00ffcc'],
              ['#7aff38', '#0575E6'],
              ['#7bcbee', '#00ffcc']
            ]
          }
        }
      });
    }, 0);
    
    

  box.style.display = "block"
}
let firstCall = isFirstCall();


document.getElementById('spielen').addEventListener('click', function () {

  if (firstCall == true) {
    firstCall++;
    togglePlayerSelection();
  } else if (firstCall == false) {
    PLAYER.skin = localStorage.getItem('skin');
    toggleGameMap();
  }
});
function tTotalCoins(totalCoins) {
  localStorage.setItem('totalCoins', totalCoins);
}
function getTotalCoins() {
  const coins = localStorage.getItem('totalCoins');
  if (coins !== null) {
      return parseInt(coins);
  }
  return 0;
}
function isFirstCall() {
  if (localStorage.getItem('isFirstCall') === null) {
    localStorage.setItem('isFirstCall', 'false');
    return true;
  }
  return false;
}

