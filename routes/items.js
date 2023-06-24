const express = require("express");
const router = express.Router();
const db = require("../db/connection");

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

router.get("/items", (req, res) => {
  db.getAllItems(req.query, 9)
    .then((items) => res.send({ items }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
