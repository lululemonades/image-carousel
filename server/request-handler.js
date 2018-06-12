const fs = require('fs');

exports.read = function (url, callback) {
  fs.readFile(url, (err, data) => {
    if (err) throw new Error(err);
    callback(data);
  });
};
