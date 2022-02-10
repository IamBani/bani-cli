#!/usr/bin/env node
const importLocal = require("import-local")

if (importLocal(__filename)) {
  require('npmlog').info('cli','本地的版本')
} else {
  require("../lib/index")(process.argv.slice(2))
}

