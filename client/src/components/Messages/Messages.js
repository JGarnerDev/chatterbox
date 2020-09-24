import React from "react";

import Message from "./Message";

console.log("Messages!");
const Messages = ({ messages, name }) => (
  <div id="Messages">
    {messages.map((message, i) => (
      <Message message={message} name={name} key={i} />
    ))}
  </div>
);

export default Messages;
