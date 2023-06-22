1. **My Listings:**

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
