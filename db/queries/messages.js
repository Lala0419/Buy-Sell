const db = require("../connection");

const createMessage = (newMessage) => {
  return db
    .query(
      "INSERT INTO messages (sender_id, reciever_id, item_id, message ) VALUES ($1, $2, $3, $4) RETURNING *;",
      [1, 2, 1, newMessage]
    )
    .then((data) => data.rows[0]);
};

const getMessage = () => {
  return db
    .query(
      "SELECT message from messages WHERE reciever_id = $1 ORDER BY created_at ASC",
      [2]
    )
    .then((data) => data.rows);
};

module.exports = { createMessage, getMessage };
