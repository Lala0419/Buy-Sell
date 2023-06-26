const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const messageQueries = require("../db/queries/messages");

/////////////////////////////////////////
//  GET MESSAGES (reciever)
/////////////////////////////////////////

router.get("/", (req, res) => {
	//res.render("messages");
	const reciever_id = req.body.user_id;

	return messageQueries
		.getMessage(reciever_id)
		.then((data) => {
			console.log("data", data);
			let templateVars = {
				messages: data,
			};
			res.render("messages", templateVars);
			//return res.json({ data });
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

/////////////////////////////////////////
//  SEND MESSAGES (sender)
/////////////////////////////////////////

router.post("/", (req, res) => {
	const newMessage = req.body.message;
	messageQueries
		.createMessage(newMessage)
		.then((data) => {
			res.redirect("/messages");
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;
