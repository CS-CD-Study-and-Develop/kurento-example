const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("connected to Server");
});

socket.addEventListener("message", (message) => {
    console.log("message : ", message.data, " from the server");
});

socket.addEventListener("close", () => {
    console.log("disconnected from Server");
});

setTimeout(() => {
    socket.send("hello from the browser");
}, 1000);