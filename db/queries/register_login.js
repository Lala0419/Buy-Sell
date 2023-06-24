const db = require("../connection");

const register = (newUser) => {
	const { username } = newUser;
	return db
		.query("INSERT INTO users (username) VALUES ($1) RETURNING *;", [username])
		.then((data) => data.rows[0]);
};

const login = (username) => {
	return db
		.query("SELECT * FROM users WHERE username = $1;", username)
		.then((data) => data.rows[0]);
};

module.exports = { register, login };
