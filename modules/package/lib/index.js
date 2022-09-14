'use strict';

const { isObject } = require("@bani-cli/utils");

class Packages{
  constructor(options) {
    if (!options || !isObject(options)) {
      throw new Error(`options must is Object`)
    }
    this.targetPath = options?.targetPath
    
    this.storePath = options?.storePath

    this.packageName = options?.packageName

    this.packageVersion = options?.packageVersion
  }
  exists () {
    
  }
  install () {
    
  }
  update () {
    
  }
  getRootPath () {
    
  }

}




module.exports = {
  Packages
};




