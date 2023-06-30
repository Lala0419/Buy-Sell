const db = require("../connection");

const addToFavourites = (itemId, userId) => {
  return db.query(
    `
  INSERT INTO favourites (item_id, user_id) VALUES ($1, $2);
  `,
    [itemId, userId]
  );
};

const removeFromFavourites = (itemId, userId) => {
  return db.query(
    `
  DELETE FROM favourites WHERE item_id = $1 AND user_id = $2;
  `,
    [itemId, userId]
  );
};

const findFavByUserIdItemId = (itemId, userId) => {
  return db.query(
    `SELECT * FROM favourites WHERE item_id = $1 AND user_id = $2`,
    [itemId, userId]
  );
};
module.exports = {
  addToFavourites,
  removeFromFavourites,
  findFavByUserIdItemId,
};
