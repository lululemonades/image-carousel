var express = require('express')
var models = require('./models')
var Product = models.Product

var app = express()
// Absolute is preffered
app.use(express.static('./public'))
app.get('/products/:id/images', function(req, res) {
  const id = req.param.id
  Product.find({_id: id}, function(err, data) {
    if (err) throw new Error(err)
    res.end(JSON.stringify(data[0]))
  })
})
app.listen(8080)
