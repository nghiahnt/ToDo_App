CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start DATE,
    date_end DATE,
);

