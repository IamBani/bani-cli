'use strict';
const npmlog = require("npmlog")




npmlog.addLevel('debugger',2000,{color:'#f40'})

function index(pkg) {
    // TODO
  npmlog.info('cli',pkg)
}

module.exports = {
  log:index,
  npmlog 
}
