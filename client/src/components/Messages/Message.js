import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let fromCurrentUser = false;

  user === name ? (fromCurrentUser = true) : (fromCurrentUser = false);
  console.log("Msg!");
  return fromCurrentUser ? (
    <div className="Message">
      <p className="message-text currentUser">{text}</p>
      <h3 className="message-userbadge currentUser">{user}</h3>
    </div>
  ) : (
    <div className="Message">
      <h3 className="message-userbadge">{user}</h3>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default Message;
