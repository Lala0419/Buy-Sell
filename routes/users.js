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
  console.log("req.body;", req.body);
  if (!newUser) {
    console.log("req.body", req.body);
    return res
      .status(403)
      .render("error", { message: "Provide name to register!" });
  }

  userQueries
    .register(newUser)
    .then(() => {
      res.redirect("/");
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
  console.log("body", req.body);
  if (!username) {
    console.log("line 41", username);
    return res.status(403).json("error");
    // .render("error", { message: "We need your name to login!" });
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

      // req.session.user_id = user.id;
      res.redirect("/");
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
