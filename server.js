var express = require('express')
var mongoose = require('mongoose')
var handler = require('./request-handler')
var path = require('path')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/products')
var db = mongoose.connection
var imageSizeSchema = new Schema({
  tinyUrl: String,
  smallUrl: String,
  largeUrl: String,
  superLargeUrl: String
})
var imageSchema = new Schema({
  _id: String,
  urls: [imageSizeSchema]
})
var productSchema = new Schema({
  _id: String,
  gender: String,
  category: String,
  type: String,
  colors: String
})
var Image = db.model('Image', imageSchema)
var Product = db.model('Product', productSchema)
handler.read(path.join(__dirname, '/products.txt'), function(data) {
  var body = ''
  body += data
  var rows = body.split('\n')
  var items = []
  var json = {}
  rows.forEach((row, index) => {
    var cells = row.split('\t')
    if (index === 0) {
      cells.forEach(cell => {
        json[cell] = ''
      })
    } else {
      var copy = {}
      var keys = Object.keys(json)
      keys.forEach((key, index) => {
        copy[key] = cells[index]
      })
      items.push(copy)
    }
  })
  if (items[items.length - 1].id === '') items.pop()
  items.forEach(item => {
    item._id = item.id
    delete item.id
    var newProduct = new Product(item)
    newProduct.save((err) => { if (err) console.log(err) })
  })
})

var getById = /\/\d+/

var app = express()
app.use(express.static('./public'))
app.get('/products', function(req, res) {
})
app.get(getById, function(req, res) {
  var id = req.url.slice(1, req.url.length)
  Product.find({_id: id}, function(err, data) {
    if (err) console.log(err)
    res.end(JSON.stringify(data[0]))
  })
  console.log("Handling GET request at " + req.url)
})
app.listen(8080)
