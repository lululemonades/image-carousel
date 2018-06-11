var handler = require('./request-handler')
var path = require('path')
var models = require('./models')
var Product = models.Product

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
    newProduct.save((err) => { if (err) throw new Error(err) })
  })
})
