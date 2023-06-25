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
const getAllItems = (options, limit = 9) => {
  const queryParams = [];
  console.log(options);
  // options contain min_price & max_price
  let queryString = `
  SELECT items.*
  FROM items
  `;

  // User puts in a dollar amount for MIN or MAX price filter.
  if (options.min_price) {
    queryParams.push(options.min_price);
    queryString += `${filter(queryParams)} price >= $${queryParams.length}`;
  }
  if (options.max_price) {
    queryParams.push(options.max_price);
    queryString += `${filter(queryParams)} price <= $${queryParams.length}`;
  }

  queryString += `
  GROUP BY items.id
  `;

  queryParams.push(limit);
  queryString += `
  ORDER BY price
  LIMIT $${queryParams.length};
  `;
  console.log(queryParams, queryString);

  return db.query(queryString, queryParams).then((res) => {
    console.log(res.rows);
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
      console.log(res.rows);
      return res.rows;
    });
};

module.exports = { getAllItems, getNewItems };
