// eslint-disable-next-line prettier/prettier
;['commands', 'create', 'init'].forEach((m) => {
  Object.assign(exports, require(`./lib/${m}`))
})
