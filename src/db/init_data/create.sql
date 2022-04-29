DROP TABLE IF EXISTS searches;
CREATE TABLE IF NOT EXISTS searches(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    img VARCHAR(300),
    link VARCHAR(300),
    lang TEXT,
    runtime TEXT
);

-- CREATE TABLE IF NOT EXISTS searches (id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL, img VARCHAR(300),  link VARCHAR(300), lang TEXT, runtime TEXT); 