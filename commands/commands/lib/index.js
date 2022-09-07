'use strict';
const chalk = require('chalk')
const { Command } = require('commander')

const {npmlog} = require("@bani-cli/log");

const program = new Command()

function commands (pkg) {
  program
    .name(Object.keys(pkg['bin'])[0])
    .usage('<commande> [options]')
    .version(pkg.version, '-v,--version')
  
  program.command('create')
    .description('create a new project powered by bani-cli')
    .usage('<app-name>')
    .option('-f, --force','是否强制克隆')
    .action(function(name,options) {
      require("@bani-cli/create")(name,options)
    }).showHelpAfterError()
  
  
  program.on('command:*', function (obj) {
    const futrueCommand = program.commands.map(cmd => cmd.name())
    npmlog.error(chalk.red(`未知的命令 ${obj.join()}`));
    console.log();
    program.outputHelp()
  })
  program.showHelpAfterError();
  program.parse(process.argv);
  if (program.args && program.args.length < 1) {
    program.outputHelp()
  }
}

module.exports = { commands };
