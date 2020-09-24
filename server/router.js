const express = require("express");
const { users } = require("./utils/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is up");
});

router.post("/namecheck", (req, res) => {
  let existingUser = users.find((user) => {
    return user.room === req.body.room && user.name === req.body.name;
  });
  existingUser
    ? res.send({
        error: true,
        message: "There's already a user by that name in this room",
      })
    : null;
});

module.exports = router;
