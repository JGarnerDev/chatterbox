import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import { Container, Paper } from "@material-ui/core";

import Header from "../Header/Header";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  useEffect(
    () => {
      //   the query string is everything beyond 'chat?' in the Join component's Link 'to' property (i.e. 'name=foo&room=bar')
      const { name, room } = queryString.parse(location.search);

      socket = io(ENDPOINT);

      setName(name);
      setRoom(room);

      // emitting an event to the server for a confirmation message containing the values of name and room
      socket.emit("join", { name, room });

      //   when the component is unmounted, the user is disconnected from the session
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    },
    //   useEffect will only be triggered when any values in this array are changed
    [location.search]
  );

  useEffect(() => {
    if (messages.length > 5) {
      messages.shift();
    }
    // when a message is made in the room, it is added to the list of messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  return (
    <Container id="Chat">
      <Paper id="chat-wrapper">
        <Header room={room} />
        <Messages messages={messages} name={name} />
        <Input socket={socket } />
      </Paper>
    </Container>
  );
};

export default Chat;
