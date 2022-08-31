'use strict';
const os = require('os')
const path = require('path')

const chalk = require('chalk')
const semver = require('semver')
const {log,npmlog} = require("@bani-cli/log");
const pkg = require("../package.json")
const { LOWEST_NODE_VERSION} = require("./const")
const { sum } = require("@bani-cli/utils")
const { commands } = require("@bani-cli/commands")
const rootCheck = require('root-check')
const dotenv = require('dotenv')
const minimist = require('minimist')
module.exports = core;

function core() {
    // TODO
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
  } catch (e) {
    npmlog.error(e.message)
  }
}

function checkEnv () {
  
}


function checkInputArgs () {
  const args = minimist(process.argv.slice(2))
  console.log(args);
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose'
  } else {
    process.env.LOG_LEVEL = 'info'
  }
  npmlog.level = process.env.LOG_LEVEL
  npmlog.verbose('de1','test')
}


function checkUserHome () {
  if (!os.homedir || !os.homedir()) {
    throw new Error(chalk.red('当前用户主目录不存在'))
  }  
}

function checkRoot () {
  rootCheck()
}

function checkNodeVersion () {
  if (!semver.gte(process.version,LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red(`bani-cli需要${LOWEST_NODE_VERSION} 以上的node版本`))
  }
}

function checkPkgVersion () {
  // npmlog.debugger('deb', pkg.version)
  log(pkg.version)
}