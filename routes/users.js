/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const userQueries('..db/queries/signup_login.js')

router.get("/", (req, res) => {
	res.render("users");
});

router.post("/register", (req, res) => {
	const { username } = req.body;
	if (!name) {
		return res
			.status(403)
			.render("error", { message: "Provide name to register!" });
	}

	const newUser = { username };
	userQueries
		.register(newUser)
		.then(() => {
			res.redirect("/login");
		})
		.catch((err) => {
			res
				.status(500)
				.render("error", { message: `Error registering user: ${err.message}` });
		});
});

router.post("/login", (req, res) => {
	const { username } = req.body;
	if (!username) {
		return res
			.status(403)
			.render("error", { message: "We need your name to login!" });
	}

	userQueries
		.login(username)
		.then((user) => {
			console.log("user", user);
			if (!user) {
				return res
					.status(403)
					.render("error", { message: "Invalid user name!" });
			}

			req.session.user_id = user.id;
			res.redirect("/home");
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

router.post("/logout", (req, res) => {
	req.session = null;
	res.redirect("/login");
});

module.exports = router;

