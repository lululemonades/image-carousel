const { Client } = require('pg');

const client = new Client({
  database: 'product_info_and_images',
});
client.connect();

const getProduct = (productId, callback) => {
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

  where p.id=${productId}
  `;

  client.query(sql, (err, res) => {
    if (err) {
      console.log('ERROR QUERYING DB', err);
    } else {
      const firstRow = res.rows[0];
      const details = [firstRow.gender, firstRow.category, firstRow.type];
      const images = res.rows.map(entry => entry.url);
      const packet = {
        details,
        images,
      };

      callback(packet);
    }
  });
};

module.exports = {
  getProduct,
};
