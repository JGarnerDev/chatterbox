import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  // hooks to handle state changes in a functional component
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

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
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          // the link goes to an address formed with both user name and room
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit">Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
