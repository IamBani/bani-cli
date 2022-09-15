'use strict';
const path = require("path")
const pathExists = require("path-exists")
const npminstall = require("npminstall")
const pkgDir = require('pkg-dir');

const { isObject,formatPath } = require("@bani-cli/utils");
const {getRegistry} =require("@bani-cli/get-npm-info")
class Packages{
  constructor(options) {
    if (!options || !isObject(options)) {
      throw new Error(`options must is Object`)
    }
    this.targetPath = options?.targetPath
    
    this.storeDir = options?.storeDir

    this.storePath = options?.storePath

    this.packageName = options?.packageName

    this.packageVersion = options?.packageVersion
  }
  exists () {
    if (this.storeDir) {
      
    } else {
      return pathExists.sync(this.targetPath)
    }
  }
  install () {
   return npminstall({
      root: this.targetPath,
      storeDir: this.storePath,
      registry: getRegistry(),
      pkgs: [{
        name: this.packageName,
        version:this.packageVersion
      }]
    })
  }
  update () {
    
  }
  getRootFilePath () {
    const dir = pkgDir.sync(this.targetPath)
    if (dir) {
      const pkgFile = require(path.resolve(dir, "package.json"))
      console.log(dir);
      if (pkgFile && pkgFile?.main) {
        return formatPath(path.resolve(dir,pkgDir.main))
      }
    }
    return null
  }

}




module.exports = {
  Packages
};




