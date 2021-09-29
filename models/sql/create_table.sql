DROP TABLE IF EXISTS users;

CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   username VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(125) NOT NULL,
   created_at TIMESTAMPTZ DEFAULT now()
);

DROP TABLE IF EXISTS mv_ratings;
CREATE TABLE IF NOT EXISTS mv_ratings(
    id SERIAL PRIMARY KEY,
    movie_id INT,
    user_id INT NOT NULL,
    rating INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
                ON DELETE CASCADE
);