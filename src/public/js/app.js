const socket = io();

const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute")
const camearBtn = document.querySelector("#camera")

let myStream;

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
