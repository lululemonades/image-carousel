const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
});


const getProduct = (productId) => {
  const query = `SELECT * FROM products_images.products WHERE id = ${productId}`;
  return client.execute(query);
};

module.exports = {
  getProduct,
};
