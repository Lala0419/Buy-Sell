1. **My Listings (Admin only):**

   - **Read:** Retrieve a list of items the user has listed for sale.
   - **Update:** Edit the sale status of an item.
   - **Delete:** Remove an item from the site.

     **Routes:**

   - **GET /my-listings:** Retrieve the user's listed items.
   - **PATCH /my-listings/{item_id}:** Update the sale status of a specific item.
   - **DELETE /my-listings/{item_id}:** Delete a specific item from the user's listings.

2. **My Favourites:**

   - **Read:** Retrieve a list of items the user has favorited.
   - **Delete:** Remove an item from the user's favorites.

     **Routes:**

   - **GET /my-favourites:** Retrieve the user's favorited items.
   - **DELETE /my-favourites/{item_id}:** Delete a specific item from the user's favorites.

3. **New Listing (for admins only):**

   - **Create:** Add a new item listing for sale.

     **Routes:**

   - **POST /new-listing:** Create a new item listing.

4. **SignUp/login page:**

   - **Read:** username and password that matches with the database.
   - **Create:** new username and add it to the users database.

     **Routes:**

   - **GET users/me** check the cookie and redirect to home page.
   - **GET users/logout** redirect to signup/login page
   - **POST users/login** redirect to home page.
   - **POST users/signup** redirect to home page

5. **Message:**

   - **Read:** get all of my messages.
   - **Create:** New message and add that to the message database

     **Routes:**

   - **GET messages/** get all of my messages.
     Example response: [{receiver_name: 'Jim', receiver_id: 432, message: 'Can I buy this?', date: '2032-4-042'}, ...]
   - **POST messages/** Create a new message.
     Example for body {receiver_id: 43, item_id: 32, message: "Is this still for sale?"}

6. **Nav bar:**

reference: tiny-app, lightbnb

- **GET /login** Renders login page

- **GET /register** Leads the user to the 'Sign up' page

- **GET /home** home logo which render the homepage if somewhere else

- **GET /logout** logout & clear user_id cookie

**Side bar/drop down**

reference: tiny-app, lightbnb

- **GET /my-favourites** Leads to the page to the List of favourited items

- **GET /my-messages** Leads to My messages page

- **GET /My Listings** Route to the page for my-listings (admin only)

- **GET /new-listing** Route to Create new listing (admin only)

**Homepage**

- **GET /home** Route for rendering the main dashboard with

  a). featured items

  b). Other announcements, etc.User can filter items by price on main feed

**Item page**

- **GET /Item{item_id}** Leads to individual item's page for users

- **GET /login** Takes to login page to login

- **POST /Item{item_id}/favourite** User can favourite an item from the item page

- **GET /Item{item_id}/message**User can click on “Message seller” on item page, which takes them to a messaging page with seller (need to figure out if we want a separate page for messages or the same page)

- **POST /ITEM{item_id}/status** edit item status (admin)
