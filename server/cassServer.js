const express = require('express');
const cors = require('cors');
const query = require('../database/cassandra');

const app = express();
app.use(cors());

app.use(express.static('./public'));
app.use('/product/:id', express.static('./public'));

app.get('/product/:id/images', (req, res) => {
  query.getProduct(req.params.id)
    .then((result) => {
      const data = result.rows[0];
      const images = [];
      const details = [data.gender, data.category, data.type];

      Object.keys(data.images).map(key => images.push(data.images[key]));

      const packet = {
        details,
        images,
      };

      res.send(packet);
    })
    .catch(err => console.log(err));
});

app.listen(3004);
