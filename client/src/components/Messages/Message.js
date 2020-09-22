import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let fromCurrentUser = false;

  user === name ? (fromCurrentUser = true) : (fromCurrentUser = false);

  return fromCurrentUser ? (
    <div>
      <h3>{user}</h3>
      <p>{text}</p>
    </div>
  ) : (
    <div>
      <p>{text}</p>
      <h3>{user}</h3>
    </div>
  );
};

export default Message;
