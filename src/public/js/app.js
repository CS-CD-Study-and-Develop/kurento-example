const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute")
const camearBtn = document.querySelector("#camera")

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(myStream);
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
}

getMedia();

function handleMuteClick() {
  if(!muted) {
    muteBtn.innerHTML = "Unmute";
    muted = true;
  } else {
    muteBtn.innerHTML = "Mute";
    muted = false;
  }
}
function handleCamearClick() {
  if(cameraOff) {
    camearBtn.innerHTML = "Turn Camera Off";
    cameraOff = false;
  } else {
    camearBtn.innerHTML = "Turn Camera On";
    cameraOff = true;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
camearBtn.addEventListener("click", handleCamearClick);