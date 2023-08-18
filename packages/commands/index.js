function init() {
  const list = ['commands', 'create', 'init']
  list.forEach((m) => {
    Object.assign(exports, require(`./lib/${m}`))
  })
}
init()
