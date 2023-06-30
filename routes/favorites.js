const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const {
  addToFavourites,
  removeFromFavourites,
  findFavByUserIdItemId,
} = require("../db/queries/favourites");
const { getSingleUser } = require(`../db/queries/users`);

router.get("/", (req, res) => {
  // const userId = req.user.id; // <-- not sure if that's right..
  const userID = 1;

  db.query("SELECT * FROM favourites WHERE user_id = $1", [userID])
    .then((data) => {
      const favoriteItems = data.rows;
      // res.json({ favoriteItems });
      getSingleUser(req.cookies.userId).then((user) => {
        res.render("favorites", { favoriteItems, user });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
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
  console.log("itemId", req.params.itemId);
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
