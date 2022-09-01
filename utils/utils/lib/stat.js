const fs = require('fs')

function isFile (path) {
  try {
    const stat = fs.statSync(path)
    if(stat && stat.isFile())return true
  } catch (error) {
    return false
  }
}

module.exports = {
  isFile
}