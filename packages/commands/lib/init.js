const { Command } = require("@bani-cli/modules");


class InitCommand extends Command{
  init () {

  }
  exce () {
    
  }
}

function init () {
  return new InitCommand(arguments)
}
module.exports = {
  init,
  InitCommand
}