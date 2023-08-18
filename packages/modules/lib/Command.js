const { npmlog, isArguments } = require('@bani-cli/utils')
const chalk = require('chalk')
class Command {
  constructor(arg) {
    if (!arg) {
      throw new Error('参数不能为空')
    }
    if (!isArguments(arg)) {
      throw new Error('参数不是对象')
    }
    this._arg = arg
    this._cmd = null
    this._argv = null
    new Promise(() => {
      const chain = Promise.resolve()
      chain
        .then(() => {
          this.initArg()
        })
        .then(() => {
          this.init()
        })
        .then(() => {
          this.exce()
        })
        .catch((err) => {
          npmlog.error(chalk.red(`${err.message}`))
        })
    })
  }
  initArg() {
    const arg = Array.from(this._arg)
    this._cmd = arg.at(-1)
    this._argv = arg.slice(0, arg.length - 1)
  }
  init() {
    throw new Error('必须实现init方法')
  }
  exce() {
    throw new Error('必须实现exce方法')
  }
}

module.exports = {
  Command
}
