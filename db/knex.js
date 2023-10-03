require("dotenv").config();

const conn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const knex = require("knex")({
  client: "pg",
  connection: conn,
});

module.exports = knex;
