const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("#welcome form");
const room = document.querySelector("#room");

let roomName;
let nickname;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        addMessage(`You: ${value}`)
    });
    input.value = "";
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("#nickname");
    socket.emit("nickname", input.value);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;
    const messageForm = room.querySelector("#msg");
    messageForm.addEventListener("submit", handleMessageSubmit);
    form.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const inputRoomName = form.querySelector("#roomname");
  const inputNickname = form.querySelector("#nickname");
  console.log(inputRoomName.value, inputNickname);
  socket.emit("enter_room", inputRoomName.value, inputNickname.value, showRoom);
  roomName = inputRoomName.value;
  nickname = inputNickname.value;
  inputRoomName.value = "";
  inputNickname.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} joined`);
})

socket.on("bye", (left) => {
    addMessage(`${left} left ㅠㅠ`);
})

socket.on("new_message", addMessage);