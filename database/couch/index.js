const nano = require('nano')('http://localhost:5984/');

const productsImages = nano.use('products_images');

const getProduct = (productId, callback) => {
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

      callback(null, packet);
    } else {
      callback(err);
    }
  });
};

const deleteProduct = (productId, callback) => {

};

const updateProduct = (productId, callback) => {

};

const createProduct = (callback) => {

};

module.exports = {
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
