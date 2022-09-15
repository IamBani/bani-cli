'use strict';

const path = require("path")

const { Packages } = require("@bani-cli/package")

const SETTINGS = {
  create:'@bani-cli/core'
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
  if (!targetPath) {
    targetPath = path.resolve(homePath,CACHE_DIR)
    storeDir = path.resolve(targetPath, 'node_modules') 
    pgk = new Packages({
      targetPath,
      storeDir,
      homePath,
      packageName,
      packageVersion:'latest'
    })
    if (pgk.exists()) {
    
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
  if (rootFile) {
    require(rootFile)()
  }
}


module.exports = create;