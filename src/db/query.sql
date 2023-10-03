CREATE DATABASE platinum;

CREATE TABLE category (
    category_id BIGSERIAL PRIMARY KEY,
    is_delete BOOLEAN NOT NULL, 
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin VARCHAR(15) DEFAULT 'user' CHECK (is_admin IN ('user', 'author')),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone_number VARCHAR(12) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  deleted_at TIMESTAMPTZ
);

CREATE TABLE comment (
    comment_id BIGSERIAL PRIMARY KEY, 
    detail_comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    is_delete BOOLEAN NOT NULL, 
    news_id INT, 
    user_id INT, 
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE news (
    news_id BIGSERIAL PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    description VARCHAR(255) NOT NULL,
    detail VARCHAR(255) NOT NULL, 
    image BYTEA NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    recommendation BOOLEAN NOT NULL,
    view_number INT NOT NULL,
    title_desc VARCHAR(255) NOT NULL,
    is_delete BOOLEAN NOT NULL, 
    category_id INT, 
    user_id INT, 
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id), 
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(category_id) 
);

ALTER TABLE comment 
    ADD CONSTRAINT fk_news FOREIGN KEY(news_id) REFERENCES news(news_id);

ALTER TABLE news ALTER COLUMN detail TYPE TEXT;
