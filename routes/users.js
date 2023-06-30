/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const userQueries = require("../db/queries/register_login.js");

// according to server.js this route is actually localhost8080/users
router.get("/", (req, res) => {
  res.render("index");
});
/// /////////////////////////////////////////
// REGISTER
/// /////////////////////////////////////////
router.get("/register", (reg, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  if (!newUser) {
    return res
      .status(403)
      .render("error", { message: "Provide name to register!" });
  }

  userQueries
    .register(newUser)
    .then(() => {
      res.redirect("/users/login");
    })
    .catch((err) => {
      res
        .status(500)
        .render("error", { message: `Error registering user: ${err.message}` });
    });
});

/// /////////////////////////////////////////
// LOGIN
/// /////////////////////////////////////////
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  if (!username) {
    return res.status(403).json("error");
    // .render("error", { message: "We need your name to login!" });
  }

  userQueries
    .login(username)
    .then((user) => {
      if (!user) {
        return res
          .status(403)
          .render("error", { message: "Invalid user name!" });
      }
      // set a cookie
      res.cookie("userId", user.id); // async
      // req.session.user_id = user.id;
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/// /////////////////////////////////////////////
// LOGOUT
/// //////////////////////////////////////////////
router.post("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});

module.exports = router;
