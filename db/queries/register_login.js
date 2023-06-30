const db = require("../connection");

const register = (newUser) => {
  const { username, email, phone_number, address } = newUser;
  return db
    .query(
      "INSERT INTO users (username, email, phone_number, address) VALUES ($1, $2, $3, $4) RETURNING *;",
      [username, email, phone_number, address]
    )
    .then((data) => data.rows[0]);
};

const login = (username) => {
  return db
    .query("SELECT * FROM users WHERE username = $1;", [username])
    .then((data) => data.rows[0]);
};

module.exports = { register, login };
