const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  // const userId = req.user.id; // <-- not sure if that's right
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

module.exports = router;
