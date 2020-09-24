import React, { useState } from "react";

const Input = ({ socket }) => {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    if (newMessage) {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return (
    <form>
      <input
        type="text"
        value={newMessage}
        onChange={(event) => {
          setNewMessage(event.target.value);
        }}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button
        onClick={(event) => {
          sendMessage(event);
        }}
      >
        Send
      </button>
    </form>
  );
};
export default Input;
