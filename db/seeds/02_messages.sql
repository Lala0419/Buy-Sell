INSERT INTO messages (sender_id, reciever_id, item_id, message ) VALUES (1, 2, 1, 'hello') RETURNING *;
INSERT INTO messages (sender_id, reciever_id, item_id, message ) VALUES (3, 2, 1, 'bye') RETURNING *;
