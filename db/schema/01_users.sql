-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS messages CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(32),
  address VARCHAR(255) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  status BOOLEAN DEFAULT TRUE,
  description TEXT,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  photo VARCHAR(255) NOT NULL
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  sender_id INTEGER REFERENCES  users(id)ON DELETE CASCADE,
  reciever_id INTEGER REFERENCES  users(id)ON DELETE CASCADE,
  item_id INTEGER REFERENCES  users(id)ON DELETE CASCADE,
  message TEXT NOT NULL,
  date   DATE NOT NULL
);

