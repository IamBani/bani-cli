'use strict';

const { Packages } = require("@bani-cli/package")


module.exports = exec;

function exec () {
  console.log(123);
  console.log(Packages);
}
