function init() {
  const list = ['Packages', 'Command']
  list.forEach((m) => {
    Object.assign(exports, require(`./lib/${m}`))
  })
}
init()
