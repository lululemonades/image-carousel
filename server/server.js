const express = require('express');
const models = require('./models');
const parser = require('body-parser');

const { Image, Product } = models;

const app = express();
app.use(parser.text());
// Absolute is preffered
app.use(express.static('./public'));
app.get('/products/:id/images', (req, res) => {
  const { id } = req.params;
  const result = [];
  Product.find({ _id: id }, (err, data) => {
    if (err) throw new Error(err);
    result.push(data[0]);
  })
    .then(() => {
      Image.find({ _id: id }, (err, data) => {
        if (err) throw new Error(err);
        result.push(data[0]);
      })
        .then(() => {
          res.end(JSON.stringify(result));
        });
    });
});
app.listen(3004);
