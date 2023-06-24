const express = require("express");
const router = express.Router();
const itemQueries = require(`../db/queries/items`);

// Original template:
// router.get("/", (req, res) => {
// 	const query = `SELECT * FROM widgets`;
// 	console.log(query);
// 	db.query(query)
// 		.then((data) => {
// 			const widgets = data.rows;
// 			res.json({ widgets });
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ error: err.message });
// 		});
// });

// module.exports = router;

// according to server.js this route is actually localhost8080/items
router.get("/", (req, res) => {
  itemQueries
    .getAllItems()
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
    .getNewItems(req, 3)
    .then((items) => res.json(items))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
