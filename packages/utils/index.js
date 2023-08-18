// eslint-disable-next-line prettier/prettier
;[('formarPath', 'shared', 'stat', 'log', 'getNpmInfo')].forEach((m) => {
  Object.assign(exports, require(`./lib/${m}`))
})
