/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// according to server.js this route is actually localhost8080/users
router.get("/", (req, res) => {
	res.render("users");
});
router.get("/login", (req, res) => {
	res.send("ok");
	//res.render("home");
});
router.get("/logout", (req, res) => {
	res.render("users");
});
router.get("/signin", (req, res) => {
	res.render("users");
});

module.exports = router;
