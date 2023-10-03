const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  return userRepository.getAllUsers();
};

const getUserByUsername = async (username) => {
  return userRepository.getUserByUsername(username);
};

const getUserById = async (id) => {
  return userRepository.getUserById(id);
};

const updatePassword = async (username, oldPassword, newPassword) => {
  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }

  const isOldPasswordValid = await userRepository.verifyPassword(
    username,
    oldPassword
  );

  if (!isOldPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

  const updatedUser = await userRepository.updatePassword(
    username,
    hashedNewPassword
  );

  return updatedUser;
};

const deleteUserByUsername = async (username) => {
  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }

  await userRepository.deleteUser(username);
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  updatePassword,
  deleteUserByUsername,
};
