const db = require("../connection");

// Helper function to add conditions in the queryString
const filter = (queryParams) => {
  let queryString = "";
  if (queryParams.length === 1) {
    queryString += "WHERE";
  } else {
    queryString += "AND";
  }
  return queryString;
};

// Retrieves all items for the user
const getAllItems = (options) => {
  const queryParams = [];
  // console.log(options);
  // options contain min_price & max_price
  let queryString = `
  SELECT items.*
  FROM items
  `;

  // User puts in a dollar amount for MIN or MAX price filter.
  if (options.min_price) {
    queryParams.push(options.min_price);
    queryString += ` ${filter(queryParams)} price >= $${queryParams.length} `;
  }
  if (options.max_price) {
    queryParams.push(options.max_price);
    queryString += ` ${filter(queryParams)} price <= $${queryParams.length} `;
  }

  queryString += `ORDER BY price DESC;`;

  // console.log(queryParams, queryString);

  return db.query(queryString, queryParams).then((res) => {
    // console.log(res.rows);
    return res.rows;
  });
};

// Render 4 newest items from the database
const getNewItems = () => {
  return db
    .query(
      `
  SELECT *
  FROM items
  ORDER BY date DESC
  LIMIT 4
  `
    )
    .then((res) => {
      return res.rows;
    });
};

// Single item query
const getItemById = (itemId) => {
  return db.query(`SELECT * FROM items WHERE id = $1`, [itemId]).then((res) => {
    console.log(res.rows[0]);
    return res.rows[0];
  });
};

const changeItemStatus = (itemId, itemStatus) => {
  const status = !itemStatus;
  console.log("status:", status, "itemStatus", itemStatus, "itemId", itemId);
  // itemStatus is current status, so we need to change it the opposite way.
  return db
    .query(`UPDATE items SET status = $1 WHERE id = $2`, [status, itemId])

    .then((res) => {
      console.log(res.rows[0]);
      return res.rows[0];
      // one single item from the items table with the updated status.
    });
};

const createItem = (
  name,
  description,
  price,
  seller_id,
  date,
  status,
  photo
) => {
  return db
    .query(
      `INSERT INTO items (name, description, price, seller_id, date, status, photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description, price, seller_id, date, status, photo]
    )
    .then((res) => {
      console.log(res.rows[0]);
      return res.rows[0];
    });
};

const getFavorites = (favoritesArray) => {
  let items = [];
  for (const favorite of favoritesArray) {
    const itemId = favorite.item_id;
    const queryParams = [itemId];
    const queryString = `
  SELECT * FROM items WHERE items.id = $1
  `;
    db.query(queryString, queryParams).then((res) => {
      items = [...items, res.rows[0]];
      // console.log(items);
    });
  }
  console.log(items);
  return items;
};

const deleteItemListing = (itemId) => {
  return db.query(`DELETE FROM items WHERE id = $1`, [itemId]).then((res) => {
    return db
      .query(`DELETE FROM favourites WHERE item_id = $1`, [itemId])
      .then((res) => {
        return res.rows[0];
      });
  });
};

module.exports = {
  getAllItems,
  getNewItems,
  getItemById,
  changeItemStatus,
  createItem,
  getFavorites,
  deleteItemListing,
};
