// Server-side code
const express = require("express");

const http = require("http");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
require("dotenv").config();

const io = new Server(server, {
  cors: "*",
});
const port = process.env.PORT ||8000
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



io.on("connection", (socket) => {
  console.log("A user connected", socket);
 
  socket.on("authenticate", ({ username, password }) => {
    console.log(username, password);
    if (username === "sharedUsername" && password === "sharedPassword") {
      // Authentication successful
      console.log("Correct password");
      socket.emit("authenticated", true);
    } else {
      // Authentication failed
      socket.emit("authenticated", false);
      socket.disconnect();
    }
  });
  socket.on("connect_error", (err) => {
    console.log(err);
  });

  socket.on("notification", (data) => {
    socket.broadcast.emit("notification", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
 });