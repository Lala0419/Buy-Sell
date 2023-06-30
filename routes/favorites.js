const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const itemQueries = require(`../db/queries/items`);
const { getSingleUser } = require(`../db/queries/users`);
const {
  addToFavourites,
  removeFromFavourites,
  findFavByUserIdItemId,
  findFavouritesByUserId,
} = require("../db/queries/favourites");

router.get("/", (req, res) => {
  const userID = req.cookies.userId; // userID is hard coded

  if (!userID) {
    res.redirect("users/login");
  } else {
    findFavouritesByUserId(userID)
      .then((data) => {
        const favoriteItems = data.rows;
        getSingleUser(req.cookies.userId).then((user) => {
          res.render("favorites", { favoriteItems, user });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
});

router.get("/:itemId", (req, res) => {
  findFavByUserIdItemId(req.params.itemId, req.cookies.userId)
    .then((data) => {
      const favoriteItems = data.rows;
      res.json({ favoriteItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/:itemId", (req, res) => {
  addToFavourites(req.params.itemId, req.cookies.userId)
    .then((item) => {
      res.json("ok");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post("/:itemId/delete", (req, res) => {
  removeFromFavourites(req.params.itemId, req.cookies.userId)
    .then((item) => {
      res.json("removed");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
