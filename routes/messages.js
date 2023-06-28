const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const messageQueries = require("../db/queries/messages");
const userQueries = require("../db/queries/users");

/////////////////////////////////////////
//  GET MESSAGES (reciever)
/////////////////////////////////////////

router.get("/", (req, res) => {
	const userId = req.cookies.userId;
	const reciever_id = req.body.user_id;
	//do they NOT have a cookie?
	if (!userId) {
		return res.status(401).send("you must login first");
	}

	//get a single use obj
	userQueries.getSingleUser(userId).then((user) => {
		console.log("user", user);

		return messageQueries
			.getMessage(reciever_id)
			.then((data) => {
				console.log("data", data);
				const templateVars = {
					messages: data,
					user: user,
				};
				res.render("messages", templateVars);
				//return res.json({ data });
			})
			.catch((err) => {
				res.status(500).json({ error: err.message });
			});
	});
	//res.render("messages");
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
