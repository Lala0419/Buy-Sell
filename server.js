// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userQueries = require("./db/queries/users");
const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // create/populate req.cookies
app.use(
	"/styles",
	sassMiddleware({
		source: __dirname + "/styles",
		destination: __dirname + "/public/styles",
		isSass: false, // false => scss, true => sass
	})
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const messagesRoutes = require("./routes/messages");
const favoritesRoutes = require("./routes/favorites");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/items", itemsRoutes);
app.use("/messages", messagesRoutes);
app.use("/users", usersRoutes);
app.use("/favorites", favoritesRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
	//res.render("index");
	//console.log(req.cookies);
	//grab the userId from cookie
	const userId = req.cookies.userId;

	//do they NOT have a cookie?
	if (userId) {
    userQueries.getSingleUser(userId).then((user) => {
      console.log("user", user);
      const templateVars = {
        user: user,
      };
      res.render("index", templateVars);
    });
		// return res.status(401).send("you must login first");
	} else {
    res.render("index");

  }

	// get a single user obj

});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
