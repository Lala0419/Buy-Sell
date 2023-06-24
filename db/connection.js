// PG database client/connection setup
const { Pool } = require("pg");

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const db = new Pool(dbParams);

db.connect();

const filter = (queryParams) => {
  let queryString = "";
  if (queryParams.length === 1) {
    queryString += "WHERE";
  } else {
    queryString += "AND";
  }
  return queryString;
};

const getAllItems = (options, limit = 9) => {
  const queryParams = [];
  console.log(options);
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

module.exports = { getAllItems };

module.exports = db;
