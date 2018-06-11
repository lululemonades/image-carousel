var fs = require('fs')

exports.read = function(url, callback) {
  fs.readFile(url, function(err, data) {
    if (err) throw new Error(err)
    callback(data)
  })
}
