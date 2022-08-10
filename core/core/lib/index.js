'use strict';

const colors = require('colors')
const semver = require('semver')
const {log,npmlog} = require("@bani-cli/log");
const pkg = require("../package.json")
const { LOWEST_NODE_VERSION,a } = require("./const");
module.exports = core;

function core() {
    // TODO
  checkPkgVersion()
  checkNodeVersion()
}

function checkNodeVersion () {
  console.log(process.version>LOWEST_NODE_VERSION)
}

function checkPkgVersion () {
  npmlog.debugger('deb',pkg.version)
  log(pkg.version)
}