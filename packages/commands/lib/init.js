const {readdir} = require('node:fs/promises')

const { Command } = require("@bani-cli/modules")

const { npmlog } = require('@bani-cli/utils')

const inquirer = require("inquirer")

const fsExtra = require('fs-extra')

class InitCommand extends Command{
  init () {
    this.cmd = this._cmd
    this.argv = this._argv

    console.log(this.cmd)
    console.log(this.argv)
  }
  exce () {
    try {
      this.prepare()
    } catch (error) {
      npmlog.error(chalk.red(`${err.message}`));
    }
  }
  async prepare(){
    const localPath = process.cwd()
    const empty = await this.isDirEmpty(localPath)
    if(empty){
        if(this.argv[0].force){
          fsExtra.emptyDirSync(localPath)
        }else{
          const answer = await inquirer.prompt([{
            default:false,
            name:'select',
            type:'confirm',
            message:'当前文件夹不为空是否继续创建项目？'
          }])
          if(answer.select){
            fsExtra.emptyDirSync(localPath)
          }
        }
    }else{
      // 空的
    }
   
  }
  async isDirEmpty(path){
    const fileList = await readdir(path)
    return !!fileList.length
  }
}

function init () {
  return new InitCommand(arguments)
}
module.exports = {
  init,
  InitCommand
}