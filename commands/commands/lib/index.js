'use strict';
const chalk = require('chalk')
const { Command } = require('commander')
const leven = require('leven')
const {npmlog} = require("@bani-cli/log");

const program = new Command()

function commands (pkg) {
  program
    .name(Object.keys(pkg['bin'])[0])
    .usage('<commande> [options]')
    .version(pkg.version, '-v,--version')
    .option('-tp,--targetPath <targetPath>','是否指定本地调试文件路径','')
  
  program.command('create <app-name>')
    .description('create a new project powered by bani-cli')
    .usage('<app-name>')
    .option('-f, --force','是否强制克隆')
    .action(function (name, options) {
      require("@bani-cli/create")(...arguments)
    }).showHelpAfterError()
  
  
  program.on('command:*', function (obj) {
    const futrueCommand = program.commands.map(cmd => cmd.name())
    const [cmd] = obj
    npmlog.error(chalk.red(`未知的命令 ${obj.join()}`));
    console.log();
    uggestCommands(cmd)
    console.log();
    program.outputHelp()
  })
  program.showHelpAfterError();
  program.parse(process.argv);
  if (program.args && program.args.length < 1) {
    program.outputHelp()
  }
}

function uggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name)

  let suggestion

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

module.exports = { commands };
