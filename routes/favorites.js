const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const itemQueries = require(`../db/queries/items`);

router.get("/", (req, res) => {
  const userID = 1; // userID is hard coded

  db.query("SELECT * FROM favourites WHERE user_id = $1", [userID])
    .then((data) => {
      const favoriteItems = data.rows;
      const favorites = itemQueries.getFavorites;
      // console.log(favorites(favoriteItems));
      // res.json({ favoriteItems });
      res.render("favorites", { favoriteItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/:itemId", (req, res) => {
  console.log("itemId", req.params.itemId);
  db.query(
    `
  INSERT INTO favourites (item_id, user_id) VALUES ($1, $2);
  `,
    [req.params.itemId, 1]
  )
    .then((item) => {
      res.json("ok");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post("/:itemId/delete", (req, res) => {
  db.query(
    `
  DELETE FROM favourites WHERE item_id = $1 AND user_id = $2;
  `,
    [req.params.itemId, 1]
  )
    .then((item) => {
      res.json("removed");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
