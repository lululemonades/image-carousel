var express = require('express')
var models = require('./models')
var Product = models.Product

var getById = /\/\d+/

var app = express()
app.use(express.static('./public'))
app.get('/products/:id/images', function(req, res) {
  const id = req.param.id
  Product.find({_id: id}, function(err, data) {
    if (err) console.log(err)
    res.end(JSON.stringify(data[0]))
  })
  console.log("Handling GET request at " + req.url)
})
app.listen(8080)
