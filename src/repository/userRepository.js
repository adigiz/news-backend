const knex = require("../db/knex");
const bcrypt = require("bcrypt");

const getAllUsers = () => {
  return knex("users").select("*");
};

const getUserByUsername = (username) => {
  return knex("users").select("*").where({ username }).first();
};

const getUserById = (id) => {
  return knex("users").where({ id }).first();
};

const createUser = (username, password, is_admin, email, phone_number) => {
  return knex("users")
    .insert({ username, password, is_admin, email, phone_number })
    .returning("*");
};

const authenticate = async (payload, done) => {
  try {
    const user = await getUserById(payload.id);
    return done(null, user);
  } catch (error) {
    return done(error, { error: unauthorized });
  }
};

const verifyPassword = async (username, password) => {
  const user = await knex("users").where({ username }).first();

  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  return isPasswordValid;
};

const updatePassword = async (username, newPassword) => {
  const updatedUser = await knex("users")
    .where({ username })
    .update({ password: newPassword })
    .returning("*");

  return updatedUser;
};

const deleteUser = async (username) => {
  await knex("users").where({ username }).delete();
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  createUser,
  authenticate,
  getUserById,
  verifyPassword,
  updatePassword,
  deleteUser,
};
