function init() {
  const list = ['formarPath', 'shared', 'stat', 'log', 'getNpmInfo']
  list.forEach((m) => {
    Object.assign(exports, require(`./lib/${m}`))
  })
}
init()
