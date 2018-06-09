var mongoose = require('mongoose')
var Schema = mongoose.Schema
// TODO:
const imageSizeSchema = new Schema({
  tinyUrl: String,
  smallUrl: String,
  largeUrl: String,
  superLargeUrl: String,
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
mongoose.connect('mongodb://localhost:27017/products')
var db = mongoose.connection
const Image = db.model('Image', imageSchema);
const Product = db.model('Product', productSchema);
// Export schemas from here
module.exports = {
  Image: Image,
  Product: Product,
}
