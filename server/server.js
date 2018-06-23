const express = require('express');
const cors = require('cors');
const db = process.env.DB === 'postgres' ? require('../database/postgres') : require('../database/couch');

const app = express();
app.use(cors());

app.use(express.static('./public'));
app.use('/product/:id', express.static('./public'));

app.get('/product/:id/images', (req, res) => {
  db.getProduct(req.params.id, (results) => {
    res.send(results);
  });
});

app.listen(3004);
