'use strict';
const path = require("path")
const pathExists = require("path-exists")
const fsExtra = require("fs-extra")
const npminstall = require("npminstall")
const pkgDir = require('pkg-dir');

const { isObject, formatPath } = require("@bani-cli/utils");
const { getRegistry, getNpmLatestVersion } = require("@bani-cli/get-npm-info")
class Packages {
  constructor(options) {
    if (!options || !isObject(options)) {
      throw new Error(`options must is Object`)
    }
    this.targetPath = options?.targetPath

    this.storeDir = options?.storeDir

    this.storePath = options?.storePath

    this.packageName = options?.packageName

    this.packageVersion = options?.packageVersion

    this.cacheFilePathPrefix = this.packageName.replace('/', '_')
  }
  async prepare () {
    if (this.storeDir && !pathExists.sync(this.storeDir)) {
      fsExtra.mkdirSync(this.storeDir)
    }
    if (this.packageVersion === 'latest') {
      this.packageVersion = await getNpmLatestVersion(this.packageName)
    }
  }
  get cacheFilePath () {
    return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`)
  }
  getSpecificCacheFilePath (packageVersion) {
    return path.resolve(this.storeDir,`_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`)
  }
  async exists () {
    if (this.storeDir) {
      console.log(this.packageVersion);
      await this.prepare()
      console.log(pathExists.sync(this.cacheFilePath));
      return pathExists.sync(this.cacheFilePath)
    } else {
      return pathExists.sync(this.targetPath)
    }
  }
  async install () {
    await this.prepare()
    return npminstall({
      root: this.targetPath,
      storeDir: this.storePath,
      registry: getRegistry(),
      pkgs: [{
        name: this.packageName,
        version: this.packageVersion
      }]
    })
  }
  async update () {
    await this.prepare()
    const latestPackageVersion = await getNpmLatestVersion(this.packageName)
    const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion)
    if (!pathExists.sync(latestFilePath)) {
      return npminstall({
        root: this.targetPath,
        storeDir: this.storePath,
        registry: getRegistry(),
        pkgs: [{
          name: this.packageName,
          version: latestFilePath
        }]
      })
    }
    return latestFilePath
  }
  getRootFilePath () {
    const dir = pkgDir.sync(this.targetPath)
    if (dir) {
      const pkgFile = require(path.resolve(dir, "package.json"))
      if (pkgFile && pkgFile?.main) {
        return formatPath(path.resolve(dir, pkgDir.main))
      }
    }
    return null
  }

}




module.exports = {
  Packages
};



