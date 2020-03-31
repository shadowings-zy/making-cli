const fs = require('fs')

const copyFiles = (source, target) => {
  let readable = fs.createReadStream(source)
  let writable = fs.createWriteStream(target)
  readable.pipe(writable)
}

const modifyBinName = (source, name) => {
  fs.readFile(source, function(err, data) {
    if (err) {
      throw err
    }
    fs.writeFile(source, data.toString().replace(/cli-maker/g, name), function(err) {
      if (err) {
        throw err
      }
    })
  })
}

module.exports = {
  copyFiles,
  modifyBinName
}
