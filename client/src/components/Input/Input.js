import React from "react";

const Input = ({ message, setMessage, sendMessage }) => (
  <form>
    <input
      type="text"
      value={message}
      onChange={(event) => {
        setMessage(event.target.value);
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

export default Input;
