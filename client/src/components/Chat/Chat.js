import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const ENDPOINT = "localhost:5000";

  useEffect(
    () => {
      //   the query string is everything beyond 'chat?' in the Join component's Link 'to' property (i.e. 'name=foo&room=bar')
      const { name, room } = queryString.parse(location.search);

      socket = io(ENDPOINT);

      setName(name);
      setRoom(room);

      // emitting an event to the server for a confirmation message containing the values of name and room
      socket.emit("join", { name, room }, () => {});

      //   when the component is unmounted, the user is disconnected from the session
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    },
    //   useEffect will only be triggered when any values in this array are changed
    [ENDPOINT, location.search]
  );
  return <div></div>;
};

export default Chat;
