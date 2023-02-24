'use strict';
const cp = require("child_process")
const path = require("path")

const pathExists = require("path-exists")
const fsExtra = require("fs-extra")
const chalk = require('chalk')

const { Packages } = require("@bani-cli/modules")
const { npmlog } = require('@bani-cli/utils')
const SETTINGS = {
  create: '@bani-cli/core'
}

const CACHE_DIR = 'dependencies'
async function create (name, options) {
  let pgk;
  const optionValues = arguments[2]?.parent?._optionValues
  let targetPath = optionValues?.targetPath

  let storeDir = ''
  const homePath = process.env.cliHome
  const createName = arguments[2]?.name()
  const packageName = SETTINGS[createName]
  const packageVersion = '1.0.2'

  if (!targetPath) {
    targetPath = path.resolve(homePath, CACHE_DIR)
    if (!pathExists.sync(targetPath)) {
      fsExtra.mkdirSync(targetPath)
    }
    storeDir = path.resolve(targetPath, 'node_modules')
    pgk = new Packages({
      targetPath,
      storeDir,
      homePath,
      packageName,
      packageVersion
    })
    if (await pgk.exists()) {
      await pgk.update()
    } else {
      await pgk.install()
    }
  } else {
    pgk = new Packages({
      targetPath,
      packageName,
      packageVersion
    })
  }
  const rootFile = pgk.getRootFilePath()
  console.log(rootFile);
  if (rootFile) {
    try {
    
     
      const arg = Array.from(arguments)
      const cmd = arg.at(-1)
      const o = Object.create(null)
      Object.keys(cmd).forEach(item => {
        if (cmd.hasOwnProperty(item) && !item.startsWith("_") && item !== 'parent') {
          o[item] = cmd[item]
        }
      })
      arg[arg.length-1] = o
      const code = `(()=> {
        typeof require(${rootFile}) === 'function' ? require(${rootFile}).apply(null,${JSON.stringify(arg)}) : require(${rootFile}).init.apply(null, ${JSON.stringify(arg)})
      })()`
      const child = cp.spawn('node', ['-e',code], {
        stdio: 'inherit',
      })
      child.on('error', err => {
        npmlog.error(chalk.red(`${err.message}`));
        process.exit(1)
      })
      child.on('exit', e => {
        npmlog.verbose('success:' + e)
        process.exit(e)
      })
      
    } catch (err) {
      npmlog.error(chalk.red(`${err.message}`));
    }

  }
}


module.exports = create;