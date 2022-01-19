import express from "express";
import http from "http";
import path from "path";
import WebSocket, { WebSocketServer } from 'ws';
const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// app.listen(3000, handleListen);

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

function handleConnection(socket) {
    // console.log(socket);
    console.log("connected");
}

const changeCharset = (message) => {
    return Buffer.from(message, "base64").toString("utf-8");
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("connected to browser");
    socket.on("close", () => console.log("disconnected from browser"));
    socket.on("message", (message) => {
        console.log(changeCharset(message));
        sockets.forEach(aSocket => aSocket.send(changeCharset(message)));
    });
});

server.listen(3000, handleListen);