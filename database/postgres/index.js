const { Client } = require('pg');

const client = new Client({
  database: 'product_info_and_images',
});
client.connect();

const getProduct = (productId) => {
  const sql = `
  SELECT 
    p.id,
    p.gender,
    p.category,
    p.type,
    pij.position_index,
    i.url
  FROM products p

  JOIN product_image_join pij
  ON p.id = pij.product_id

  JOIN images i
  ON pij.image_id = i.id

  where p.id=$1
  order by pij.position_index asc;
  `;
  const params = [productId];

  return client.query(sql, params)
    .then((result) => {
      const firstRow = result.rows[0];
      const details = [firstRow.gender, firstRow.category, firstRow.type];
      const images = result.rows.map(entry => entry.url);
      const packet = {
        details,
        images,
      };

      return packet;
    });
};

const deleteProduct = (productId) => {
  const sql = 'DELETE FROM products where id=$1';
  const params = [productId];

  return client.query(sql, params);
};

const updateProduct = (body) => {
  const {
    id,
    gender,
    category,
    type,
    images,
  } = body;
  const imageParams = [...images];
  const productsParams = [id, gender, category, type];

  const selectImagesQuery = `
    SELECT
    id
    FROM images
    WHERE url in ($1, $2, $3, $4, $5)
  `;

  const updateProductsQuery = `
    UPDATE products
      SET gender = $2, 
          category = $3, 
          type = $4
      WHERE id = $1
  `;

  return client.query(updateProductsQuery, productsParams)
    .then(() => client.query(selectImagesQuery, imageParams))
    .then(((response) => {
      const positionAndImageId = response.rows.map((row, i) => [i, row.id]);
      let updateImagesQuery = '';

      positionAndImageId.forEach((tuple) => {
        updateImagesQuery += `
          UPDATE product_image_join pij 
            SET image_id = ${tuple[1]} 
            WHERE pij.position_index = ${tuple[0]}
            AND pij.product_id = ${id};
        `;
      });

      return client.query(updateImagesQuery);
    }));
};

const createProduct = (body) => {
  const {
    gender,
    category,
    type,
    images,
  } = body;
  const productsParams = [gender, category, type];
  const imageParams = [...images];

  const productsInsertQuery = `
    INSERT INTO products (gender, category, type) VALUES ($1, $2, $3);
  `;

  const selectMaxQuery = `
    SELECT max(id) FROM products
  `;

  const selectImagesQuery = `
    SELECT
    id
    FROM images
    WHERE url in ($1, $2, $3, $4, $5)
  `;

  let id;

  return client.query(productsInsertQuery, productsParams)
    .then(() => client.query(selectMaxQuery))
    .then((result) => {
      id = result.rows[0].max;
      return client.query(selectImagesQuery, imageParams);
    })
    .then((response) => {
      const positionAndImageId = response.rows.map((row, i) => [i, row.id]);
      let insertImagesQuery = '';

      positionAndImageId.forEach((tuple) => {
        insertImagesQuery += `INSERT INTO product_image_join (product_id, image_id, position_index) VALUES (${id}, ${tuple[1]}, ${tuple[0]});`;
      });

      return client.query(insertImagesQuery)
        .then(() => ({ id }));
    });
};

module.exports = {
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
