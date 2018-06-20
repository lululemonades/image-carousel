DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS products;
DROP INDEX IF EXISTS products_idx ;
DROP INDEX IF EXISTS images_idx ;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  gender VARCHAR(6) NOT NULL,
  category VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  index INT NOT NULL,
  url VARCHAR(200) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- CREATE INDEX products_idx ON products(id);
-- CREATE INDEX images_idx ON images(product_id);

