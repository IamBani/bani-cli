'use strict';

const { isObject } = require("../../../utils/utils/lib/shared");

class Packages{
  constructor(options) {
    if (!options || !isObject(options)) {
      throw new Error(`options must is Object`)
    }
    this.targetPath = options?.targetPath
    
    this.storePath = options?.storePath

    this.packageName = options?.name

    this.packageVersion = options?.version
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




