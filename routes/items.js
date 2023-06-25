const express = require("express");
const router = express.Router();
const itemQueries = require(`../db/queries/items`);

// according to server.js this route is actually localhost8080/items
router.get("/", (req, res) => {
  itemQueries
    .getAllItems(req.query)
    // we are using query because we're trying to filter
    .then((items) => res.json(items))
    // we want it as a string the 'items' for res.json as I'm sending an array
    // when i'm working on the app always send as res.json
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.get("/new_items", (req, res) => {
  itemQueries
    .getNewItems()
    .then((items) => res.json(items))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
