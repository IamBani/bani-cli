'use strict';
const chalk = require('chalk')
const { Command } = require('commander')

const {npmlog} = require("@bani-cli/log");

const program = new Command()

function commands (pkg) {
  program
    .name(Object.keys(pkg['bin'])[0])
    .usage('<commande> [options]')
    .argument('<name>', '登录用户名')
    .argument('[password]', '登录密码， 默认密码123456')
    .argument('[other...]', '其他参数').version(pkg.version, '-v,--version')
  program.command('create <app-name> [options]')
    .description('create a new project powered by vue-cli-service')
    .option('-f, --force','是否强制克隆')
    .action(function(options,name) {
      console.log('options', options, name);
      console.log(this,arguments);
    })
  program.on('command:*', function (obj) {
    const futrueCommand = program.commands.map(cmd => cmd.name())

    npmlog.error(chalk.red(`未知的命令 ${obj.join()}`));
    program.outputHelp()
  })
  if (program.args && program.args.length < 1) {
    program.outputHelp()
  }
  program.parse(process.argv);
}

module.exports = { commands };
