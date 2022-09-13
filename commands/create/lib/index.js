'use strict';

const  exec = require('@bani-cli/exec')

module.exports = create;

function create (name, options) {
  process.env._optionValues = arguments[2]?.parent?._optionValues
  exec()
  console.log('options', options, name);
}
