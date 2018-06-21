const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
});

const query = 'SELECT cluster_name, listen_address FROM system.local';

const callCassandra = () => {
  return client.execute(query)
    .then(result => console.log(result))
    .catch(err => console.log(err));
};

module.exports = {
  callCassandra,
};
