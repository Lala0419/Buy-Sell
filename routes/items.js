const express = require("express");
const router = express.Router();
const itemQueries = require(`../db/queries/items`);
const { getSingleUser } = require(`../db/queries/users`);

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

router.get("/create", (req, res) => {
  getSingleUser(req.cookies.userId).then((user) => {
    if (!user) {
      res.redirect("/users/login");
    } else {
      res.render("create-item.ejs", { user });
    }
  });
});

router.get("/:id", (req, res) => {
  itemQueries
    .getItemById(req.params.id)
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

// first create a get route that renders the createItem.ejs file in this document
// test the route (make sure we can go to /items/create and the page renders)
// ensure that our form in the createItem.ejs file is connected to the post route /items/create (in real life)

router.post("/create", (req, res) => {
  const { item_name, item_description, item_price, item_photo } = req.body;
  const seller_id = 1; // the user is currently hard coded
  const date = new Date();
  const status = true;
  console.log(req.body);
  itemQueries
    .createItem(
      item_name,
      item_description,
      item_price,
      seller_id,
      date,
      status,
      item_photo
    )
    .then((item) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred. Please try again later." });
    });
});

router.post("/:id/delete", (req, res) => {
  itemQueries
    .deleteItemListing(req.body.itemId)
    .then((item) => {
      // res.json("item successfully deleted");
      console.log("router post for delete");
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

// router.post("/items:userId/")

module.exports = router;
