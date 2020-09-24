const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const {
  getUser,
  getUsersInRoom,
  removeUser,
  addUser,
} = require("./utils/users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(cors());
app.use(router);

// when a new user connection occurs
io.on("connection", (socket) => {
  //   recieved from Chat component, should return a string indicating that 'USERNAME has joined the ROOMNAME room'
  socket.on("join", ({ name, room }) => {
    // feeds the new user data to users.js to confirm unique and add, or to return !unique error
    // socket ids are unique in this app's scope, so they are retained for user.id
    const { err, user } = addUser({ id: socket.id, name, room });

    if (err) return cb(err);
    socket.join(user.room);

    // Send a message to the user that they are welcomed
    socket.emit("message", {
      user: "//",
      text: `Hey ${user.name}! Welcome to the ${user.room} room`,
    });

    // Send a message to the chat room that someone has arrived
    socket.broadcast.to(user.room).emit("message", {
      user: "//",
      text: `${user.name} has joined!`,
    });

    // we push the user to the stream of events occuring in the room
    io.to(user.room).to("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message) => {
    let user = getUser(socket.id);

    // sends a message to the room the user is in that contains the message text as well as the sender's name
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  //   disconnect user
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "//",
        text: `${user.name} has left`,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server's up on port ${PORT}`);
});
