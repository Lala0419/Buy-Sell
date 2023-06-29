const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  // const userId = req.user.id; // <-- not sure if that's right..
  const userID = 1;

  db.query("SELECT * FROM favourites WHERE user_id = $1", [userID])
    .then((data) => {
      const favoriteItems = data.rows;
      // res.json({ favoriteItems });
      res.render("favorites", { favoriteItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:itemId", (req, res) => {
  db.query("SELECT * FROM favourites WHERE item_id = $1", [req.params.itemId])
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
