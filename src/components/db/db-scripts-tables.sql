-- Create USER table
CREATE TABLE IF NOT EXISTS USER (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_salt INTEGER NOT NULL,
    password VARCHAR(255) NOT NULL
);
