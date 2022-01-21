const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute");
const camearBtn = document.querySelector("#camera");
const camerasSelect = document.querySelector("#cameras");

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(myStream);
    myFace.srcObject = myStream;
    await getCameras();
  } catch (e) {
    console.log(e);
  }
}

getMedia();

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerHTML = "Unmute";
    muted = true;
  } else {
    muteBtn.innerHTML = "Mute";
    muted = false;
  }
}
function handleCamearClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    camearBtn.innerHTML = "Turn Camera Off";
    cameraOff = false;
  } else {
    camearBtn.innerHTML = "Turn Camera On";
    cameraOff = true;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
camearBtn.addEventListener("click", handleCamearClick);
