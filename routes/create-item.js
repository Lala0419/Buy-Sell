const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const itemQueries = require(`../db/queries/items`);
const { getSingleUser } = require(`../db/queries/users`);

router.post("/create", (req, res) => {
  const { item_name, item_description, item_price, item_photo } = req.body;
  const seller_id = req.user.id; // Assuming req.user.id is correctly set
  const date = new Date();
  const status = true;

  db.query(
    "INSERT INTO items (name, description, price, seller_id, date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [item_name, item_description, item_price, seller_id, date, status]
  )
    .then((result) => {
      const itemId = result.rows[0].id;
      res.redirect(`/items/${itemId}`);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred. Please try again later." });
    });
});

router.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  itemQueries
    .getItemById(itemId)
    .then((item) => {
      getSingleUser(req.cookies.userId).then((user) => {
        res.render("item.ejs", { item, user });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
