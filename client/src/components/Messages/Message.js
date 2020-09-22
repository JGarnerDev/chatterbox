import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let fromCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  user === trimmedName ? (fromCurrentUser = true) : (fromCurrentUser = false);

  return fromCurrentUser ? (
    <div>
      <h3>{trimmedName}</h3>
      <p>{text}</p>
    </div>
  ) : (
    <div>
      <p>{text}</p>
      <h3>{trimmedName}</h3>
    </div>
  );
};

export default Message;
