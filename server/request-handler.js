const fs = require('fs');

function read(url, callback) {
  fs.readFile(url, (err, data) => {
    if (err) throw new Error(err);
    callback(data);
  });
}

exports.read = read;
