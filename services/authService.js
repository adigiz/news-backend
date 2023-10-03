const bcrypt = require("bcrypt");

const userRepository = require("../repository/userRepository");
const { USERNAME_ALREADY_EXIST_ERROR } = require("../sentinel/error");

const register = async (username, password, is_admin, email, phone_number) => {
  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const user = await userRepository.getUserByUsername(username);

    if (user) {
      throw new Error(USERNAME_ALREADY_EXIST_ERROR);
    }

    return userRepository.createUser(
      username,
      encryptedPassword,
      is_admin,
      email,
      phone_number
    );
  } catch (error) {
    throw error;
  }
  q;
};

const login = async (username, password) => {
  try {
    const user = await userRepository.getUserByUsername(username);
    if (!user) {
      throw new Error("wrong username or password");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new Error("wrong username or password");
    }

    return { id: user.id, username: user.username };
  } catch (error) {
    throw error;
  }
};
module.exports = { register, login };
