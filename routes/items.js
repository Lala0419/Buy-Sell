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

router.get("/:id", (req, res) => {
  itemQueries
    .getItemById(req.params.id)
    .then((item) => {
      console.log("item", item);
      res.render("item.ejs", { item, user: { id: 1 } });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post("/:id/status", (req, res) => {
  const statusBoolean = req.body.itemStatus === "true";
  console.log(req.body.itemId, statusBoolean);

  itemQueries
    .changeItemStatus(req.body.itemId, statusBoolean)
    .then((item) => {
      console.log("status post finished");
      // res.send("status changed");
      res.redirect("back");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
