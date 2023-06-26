const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/items", (req, res) => {
  const { item_name, item_description, item_price } = req.body;
  const seller_id = req.user.id; // <-- is this correct?>
  const date = new Date();
  const status = true;

  db.query(
    "INSERT INTO items (name, description, price, seller_id, date, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [item_name, item_description, item_price, seller_id, date, status]
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred. Please try again later." });
    });
});

module.exports = router;
