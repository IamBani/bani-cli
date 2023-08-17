
['Packages', 'Command'].forEach((m) => {
  Object.assign(exports, require(`./lib/${m}`))
})
