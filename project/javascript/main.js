function openSettings(){
    document.getElementById("settings-popup").style.display = "block";

}
document.getElementById("close-settings").addEventListener("click", function(){
    document.getElementById("settings-popup").style.display = "none";
});
let soundState = 1; 

function switchImage(changer){
    soundState = soundState * changer;
    if (soundState === 1) {
        document.getElementById('soundImage').src = "../images/sound_off.png";
    } else {
        document.getElementById('soundImage').src = "../images/sound_on.png";
    }
}
