import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Paper, TextField, Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    checkForUniqueName();
    // Every time the name or room value is changed
  }, [name, room]);

  const checkForUniqueName = () => {
    if (room.length === 0 || name.length === 0) {
      return;
    }
    axios
      // ...ask our server to see if there are any identical names in the specified room
      .post("http://localhost:5000/namecheck", { room, name })
      .then((res) => {
        // ...if there's a message, something went wrong
        if (res.data.message) {
          // put it in the state, it will render
          setError(res.data.message);
        }
      });
  };

  return (
    <Container id="Join" className="view">
      <Paper elevation={3} id="join-wrapper">
        <div id="join-form">
          <h1>Join</h1>
          <div>
            <TextField
              label="User name"
              type="text"
              variant="outlined"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              label="Room"
              type="text"
              variant="outlined"
              style={{
                background: "white",
                opacity: 1,
                zIndex: 99,
                color: "white",
              }}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <Link
            // If either name or room values don't exist, or if there is an error (e.g. name already taken), then no event is to be emitted
            onClick={(event) =>
              !name || !room || error ? event.preventDefault() : null
            }
            // the link goes to an address formed with both user name and room
            to={`/chat?name=${name}&room=${room}`}
          >
            <Button variant="contained" type="submit">
              Sign in
            </Button>
          </Link>
        </div>
        <div id="error-wrapper">
          {error ? (
            <Alert severity="error" id="error">
              <AlertTitle>Sorry!</AlertTitle>
              <strong>{error}</strong>
            </Alert>
          ) : null}
        </div>
      </Paper>
    </Container>
  );
};

export default Join;
