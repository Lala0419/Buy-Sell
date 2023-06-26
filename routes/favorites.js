const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/favorites", (req, res) => {
  const userId = req.user.id; // <-- not sure if that's right

  db.query("SELECT * FROM favorites WHERE user_id = $1", [userId])
    .then((data) => {
      const favoriteItems = data.rows;
      res.json({ favoriteItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
