'use strict';

const chalk = require('chalk')
const semver = require('semver')
const {log,npmlog} = require("@bani-cli/log");
const pkg = require("../package.json")
const { LOWEST_NODE_VERSION} = require("./const");
const { sum } = require("@bani-cli/utils")
const {commands} =require("@bani-cli/commands")
module.exports = core;

function core() {
    // TODO
  checkPkgVersion()
  checkNodeVersion()
}

function checkNodeVersion () {
  console.log(chalk.hex('#f40').bold('Hello')) 
  if (!semver.gte(process.version,LOWEST_NODE_VERSION)) {
    console.log(chalk.hex('#DEADED').underline('Hello, world!'))  
  }
}

function checkPkgVersion () {
  // npmlog.debugger('deb', pkg.version)
  log(pkg.version)
}