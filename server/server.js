// Server-side code
const server = require("http").createServer();
const io = require("socket.io")(server);
require("dotenv").config();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("authenticate", ({ username, password, role }) => {
    if (username === "sharedUsername" && password === "sharedPassword") {
      // Authentication successful
      socket.emit("authenticated", true);
    } else {
      // Authentication failed
      socket.emit("authenticated", false);
      socket.disconnect();
    }
  });

  socket.on("notification", (data) => {
    socket.broadcast.emit("notification", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
