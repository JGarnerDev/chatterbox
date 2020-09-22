import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  useEffect(() => {
    //   the query string is everything beyond 'chat?' in the Join component's Link 'to' property (i.e. 'name=foo&room=bar')
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
  });
  return <div></div>;
};

export default Chat;
