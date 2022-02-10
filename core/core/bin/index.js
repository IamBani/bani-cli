#!/usr/bin/env node
const { sum,utils } = require('@bani-cli/utils')
const importLocal = require("import-local")

if (importLocal(__filename)) {
  require('npmlog').info('cli','本地的版本')
} else {
  console.log(1243)
  require("../lib/index")(process.argv.slice(2))
}

console.log('first',require("../lib/index"))
console.log(sum(1,3))
console.log(utils(10,3))