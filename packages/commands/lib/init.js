const { Command } = require("@bani-cli/modules");


class InitCommand extends Command{
  init () {
    this.cmd = this._cmd
    this.argv = this._argv
  }
  exce () {
    
  }
}

function init () {
  console.log(arguments,2323);
  return new InitCommand(arguments)
}
module.exports = {
  init,
  InitCommand
}