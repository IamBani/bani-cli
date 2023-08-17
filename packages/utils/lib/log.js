
const npmlog = require('npmlog')

npmlog.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'

npmlog.heading = 'bani'
npmlog.addLevel('debugger', 2000, { color: '#f40' })

function index(pkg) {
  // TODO
  npmlog.info('cli', pkg)
}

module.exports = {
  log: index,
  npmlog,
}
