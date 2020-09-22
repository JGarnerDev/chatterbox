const express = require("express");
const { users } = require("./users");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is up");
});

router.post("/namecheck", (req, res) => {
  const name = req.body.name;
  const room = req.body.room;
  let existingUser = users.find((user) => {
    return user.room === room && user.name === name;
  });
  existingUser
    ? res.send({
        error: true,
        message: "There's already a user by that name in this room",
      })
    : null;
});

module.exports = router;
