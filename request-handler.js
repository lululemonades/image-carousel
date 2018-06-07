var fs = require('fs')

exports.read = function(url, callback) {
  fs.readFile(url, function(err, data) {
    if (err) console.log(err)
    callback(data)
  })
}
