'use strict'
;['commands', 'create', 'init'].forEach((m) => {
  Object.assign(exports, require(`./lib/${m}`))
})
