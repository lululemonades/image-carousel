const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  keyspace: 'products_images',
});

// couldn't create keyspace from anything other than command line
// const dropKS = 'DROP KEYSPACE IF EXISTS products_images;';
// const createKS = 'CREATE KEYSPACE products_images
//  WITH replication = {\'class\': \'SimpleStrategy\', \'replication_factor\' : 3};';

const dropProducts = 'DROP TABLE IF EXISTS products_images.products;';
const createProductsAndImages = `
CREATE TABLE products_images.products (
  id int PRIMARY KEY, 
  gender text, 
  category text, 
  type text, 
  images map<int, text>
);`;

const seedCassandra = () =>
  client.execute(dropProducts)
    .then(client.execute(createProductsAndImages));

seedCassandra().then(console.log('wrote schema to file')).catch(err => console.log(err));

process.exit();
