// we need to retain current users as { id, name, room } objects
const users = [];

const addUser = ({ id, name, room }) => {
  // room name must be made all lower case and no spaces. Ex: 'This Room' ==> 'thisroom'
  room = room.trim().toLowerCase();
  // ...same for name
  name = name.trim().toLowerCase();

  // we need to compare the attempted user data against the user objects already present in the array
  const existingUser = users.find((user) => {
    user.room === room && user.name === name;
  });

  //   ...and send them a message to inform them if we found an identical match
  if (existingUser) {
    return { error: "That user name is taken!" };
  }

  //  ...else, we make a new user
  const user = { id, name, room };

  //   ...add it to our array held in the global scope
  users.push(user);

  //   and return that use object when done
  return { user };
};

const removeUser = (id) => {
  // we look into the users array to find a match by id
  const index = users.findIndex((user) => {
    user.id === id;
  });

  //   if there is a match, splice the array for one at that index and return the first and only element in the result
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
  //  we need a function that returns a list of users based on room name match
  users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
