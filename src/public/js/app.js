const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", () => {
    console.log("connected to Server");
});

socket.addEventListener("message", (message) => {
    console.log("message : ", message.data, " from the server");
});

socket.addEventListener("close", () => {
    console.log("disconnected from Server");
});

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    console.log(input.value);
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);