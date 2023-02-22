const { Command } = require("@bani-cli/modules");


class InitCommand extends Command{

}

function init (projectName, cmdObj) {
  return new InitCommand(arguments)
}
module.exports = {
  init,
  InitCommand
}