const express = require('express');
const cors = require('cors');
const db = process.env.DB === 'postgres' ? require('../database/postgres') : require('../database/couch');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('./public'));
app.use('/product/:id', express.static('./public'));

app.get('/product/:id/images', (req, res) => {
  db.getProduct(req.params.id)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err));
});

app.delete('/product/:id/images', (req, res) => {
  db.deleteProduct(req.params.id)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err));
});

app.put('/product/:id/images', (req, res) => {
  db.updateProduct(req.body)
    .then(() => res.status(200).send())
    .catch(err => res.status(500).send(err));
});

app.post('/product/images', (req, res) => {
  db.createProduct(req.body)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err));
});

app.listen(3004);
