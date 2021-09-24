DROP TABLE IF EXISTS users;

CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   userName VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(125) NOT NULL,
   created_at TIMESTAMPTZ DEFAULT now()

);