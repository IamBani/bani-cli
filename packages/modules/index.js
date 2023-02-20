'use strict';

[
  'Packages'
].forEach(m => {
  Object.assign(exports, require(`./lib/${m}`))
})