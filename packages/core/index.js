'use strict';
const os = require('os')
const path = require('path')
const fs = require('fs');

const chalk = require('chalk')
const semver = require('semver')
const rootCheck = require('root-check')
const dotenv = require('dotenv')
const minimist = require('minimist');

const pkg = require("./package.json")
const { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME} = require("./lib/const")

const { isFile,getNpmSemverVersions,log,npmlog } = require("@bani-cli/utils")
const { commands } = require("@bani-cli/commands")

module.exports = core;
function core () {
    // TODO
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
    checkGlobalUpdate()
    commands(pkg)
  } catch (e) {
    npmlog.error(e.message)
  }
}
async function checkGlobalUpdate() {
  const version = pkg.version
  const name = pkg.name
  const res = await getNpmSemverVersions(name, version)
  let lastVersion;
  if (res.length && (lastVersion = res[0]) && semver.gt(lastVersion,version)) {
    npmlog.warn(chalk.yellow(`请手动更新${name},当前版本是${version},最新版本是${lastVersion}
    更新命令: npm install -g ${name}`
    ))
  }

}

function checkEnv () {
  const dotpath = path.resolve(os.homedir(), '.env')
  let config;
  if (isFile(dotpath)) {
     config = dotenv.config({
        path: dotpath
      })
  } else {
    createDefaultConfig()
  }
  // console.log(process.env);
}

function createDefaultConfig () {
  const userHome = os.homedir()
  const cliConfig = {
    home:userHome
  }
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome,process.env.CLI_HOME)
  } else {
    cliConfig['cliHome'] = path.join(userHome,DEFAULT_CLI_HOME)
  }
  for (const key in cliConfig) {
    process.env[key] = cliConfig[key]
  }
}

function checkInputArgs () {
  const args = minimist(process.argv.slice(2))
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose'
  } else {
    process.env.LOG_LEVEL = 'info'
  }
  npmlog.level = process.env.LOG_LEVEL
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