const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const messageQueries = require("../db/queries/messages");
const userQueries = require("../db/queries/users");
const { getItemById } = require("../db/queries/items");

/// //////////////////////////////////////
//  GET MESSAGES (reciever)
/// //////////////////////////////////////

router.get("/:itemId", (req, res) => {
  const userId = req.cookies.userId;
  const reciever_id = req.body.user_id;
  if (!userId) {
    res.redirect("/users/login");
    // return res.status(401).send("you must login first");
  }

  // get a single user obj
  userQueries.getSingleUser(userId).then((user) => {
    return messageQueries
      .getMessage(reciever_id)
      .then((data) => {
        userQueries.getUsers().then((users) => {
          getItemById(req.params.itemId).then((item) => {
            if (!item) {
              res.send("The item no longer exists");
              return;
            }
            const templateVars = {
              messages: data,
              user,
              users,
              item,
              // onMessage: true,
            };
            res.render("messages", templateVars);
          });
        });
        // return res.json({ data });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // res.render("messages");
});

/// //////////////////////////////////////
//  SEND MESSAGES (sender)
/// //////////////////////////////////////

router.post("/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const newMessage = req.body.message;
  messageQueries
    .createMessage(newMessage)
    .then((data) => {
      res.redirect(`/messages/${itemId}`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
