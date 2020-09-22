import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  const checkForUniqueName = () => {
    setError("");

    if (!name || !room) {
      setError("You need to pick a name and a room!");
      return false;
    }
    axios
      .post("http://localhost:5000/namecheck", { room, name })
      .then((res) => {
        if (res.data.message) {
          setError(res.data.message);
          return false;
        }
      });
  };

  return (
    <div className="Join">
      <div>
        <h1>Join</h1>
        <div className="">
          <input
            placeholder="User name"
            type="text"
            onChange={(event) => {
              // Same as this.setState({...})
              setName(event.target.value);
            }}
          />
        </div>
        <div className="">
          <input
            placeholder="Room"
            type="text"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
        <Link
          // If either name or room values don't exist, then no event is to be emitted
          onClick={(event) => (!name || !room || error ? event.preventDefault() : null)}
          // the link goes to an address formed with both user name and room
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit">Sign in</button>
        </Link>
        {error}
      </div>
    </div>
  );
};

export default Join;
