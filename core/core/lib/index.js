'use strict';

const colors = require('colors')
const semver = require('semver')
const log = require("@bani-cli/log");
const pkg = require("../package.json")
const { LOWEST_NODE_VERSION } = require("./const");

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
  log(pkg.version)
}