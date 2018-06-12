const mongoose = require('mongoose');

const { Schema } = mongoose;
// TODO:
const imageSizeSchema = new Schema({
  url: String,
});
const imageSchema = new Schema({
  _id: String,
  urls: [imageSizeSchema],
});
const productSchema = new Schema({
  _id: String,
  gender: String,
  category: String,
  type: String,
  colors: String,
});
mongoose.connect('mongodb://localhost:27017/products');
const db = mongoose.connection;
const Image = db.model('Image', imageSchema);
const Product = db.model('Product', productSchema);
module.exports = {
  Image,
  Product,
};
