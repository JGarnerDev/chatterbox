// we need to retain current users as { id, name, room } objects
const users = [];

const addUser = ({ id, name, room }) => {
  //   we make a new user
  const user = { id, name, room };
  //   ...add it to our array held in the global scope
  users.push(user);
  //   and return that use object when done

  return { user };
};

const removeUser = (id) => {
  // we look into the users array to find a match by id
  const index = users.findIndex((user) => {
    return user.id === id;
  });
  //   if there is a match, splice the array for one at that index and return the first and only element in the result
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

const getUsersInRoom = (room) => {
  //  we need a function that returns a list of users based on room name match
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, users };
