'use strict';

[
  'commands',
  'create',
].forEach(m => {
  Object.assign(exports, require(`./lib/${m}`))
})