'use strict';

const path = require("path")

const pathExists = require("path-exists")
const fsExtra = require("fs-extra")

const { Packages } = require("@bani-cli/modules")

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
    require(rootFile)()
  }
}


module.exports = create;