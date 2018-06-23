const nano = require('nano')('http://localhost:5984');

const getProduct = (productId, callback) => {
  const productsImages = nano.use('products_images');
  productsImages.view('products', 'product', { key: Number(productId) }, (err, body) => {
    if (!err) {
      const {
        gender,
        category,
        type,
        images,
      } = body.rows[0].value;
      const packet = {
        details: [gender, category, type],
        images,
      };

      callback(packet);
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  getProduct,
};
