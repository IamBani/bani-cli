const { readdir } = require('node:fs/promises')

const { Command } = require('@bani-cli/modules')

const { npmlog } = require('@bani-cli/utils')

const inquirer = require('inquirer')

const fsExtra = require('fs-extra')

const chalk = require('chalk')
class InitCommand extends Command {
  init() {
    this.cmd = this._cmd
    this.argv = this._argv

    console.log(this.cmd)
    console.log(this.argv)
  }
  async exce() {
    try {
      let userChoose = {}
      const result = await this.prepare()
      if (result) {
        await this.getProjectType(userChoose)
      }
    } catch (error) {
      npmlog.error(chalk.red(`${error.message}`))
    }
  }
  async prepare() {
    const localPath = process.cwd()
    const empty = await this.isDirEmpty(localPath)
    if (empty) {
      if (this.argv[0].force) {
        fsExtra.emptyDirSync(localPath)
      } else {
        const answer = await inquirer.prompt([
          {
            default: false,
            name: 'select',
            type: 'confirm',
            message: '当前文件夹不为空是否继续创建项目？'
          }
        ])
        if (!answer.select) {
          return false
        }
        fsExtra.emptyDirSync(localPath)
      }
    }
    return true
  }
  async getProjectType(userChoose) {
    const { type, engine } = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '请选择项目类型',
        default: 'pc',
        choices: [
          { name: 'pc', value: 'pc' },
          { name: 'h5', value: 'h5' },
          { name: 'uniapp', value: 'uniapp' }
        ]
      },
      {
        type: 'list',
        name: 'engine',
        message: '请选择项目框架',
        default: 'vue',
        choices: [
          { name: 'vue', value: 'vue' },
          { name: 'react', value: 'react' }
        ]
      }
    ])
    if (engine === 'vue') {
      const { version } = await inquirer.prompt([
        {
          type: 'list',
          name: 'version',
          message: '请选择项目版本',
          default: 'v2',
          choices: [
            { name: 'vue2', value: 'v2' },
            { name: 'vue3', value: 'v3' }
          ]
        }
      ])
      const { plugins, cssType } = await inquirer.prompt(
        [
          {
            type: 'checkbox',
            name: 'plugins',
            message: '请选择项目框架',
            choices: [
              { name: 'babel', value: 'babel', checked: true },
              { name: 'jsx/tsx', value: 'jsx/tsx' },
              { name: 'vue-router', value: 'vue-router' },
              version === 'v3'
                ? { name: 'typescript', value: 'typescript' }
                : null,
              version === 'v3'
                ? { name: 'pinia', value: 'pinia' }
                : { name: 'vuex', value: 'vuex' }
            ].filter(Boolean)
          },
          this.getH5(type),
          this.getUi(type)
        ].filter(Boolean)
      )
      const style = await this.getPretreatment()
      userChoose = { ...userChoose, style, plugins, version, cssType }
    } else {
      //react
    }
    userChoose = { ...userChoose, type, engine }
    console.log(userChoose)
  }
  async getPretreatment() {
    const { style } = await inquirer.prompt({
      type: 'list',
      name: 'style',
      message: '请选择css预处理器',
      choices: [
        { name: 'scss', value: 'scss' },
        { name: 'less', value: 'less' },
        { name: 'none', value: 'none' }
      ]
    })
    return style
  }
  getH5(type) {
    return type === 'h5'
      ? {
          type: 'list',
          name: 'cssType',
          message: '请选择h5的单位尺寸',
          choices: [
            {
              name: 'rem',
              value: 'rem'
            },
            {
              name: 'vh/vw',
              value: 'vh/vw'
            },
            { name: 'none', value: 'none' }
          ]
        }
      : null
  }

  getUi(type) {
    const keyValue = {
      type: 'list',
      name: 'uiComponent',
      message: '请选择ui组件'
    }
    return type === 'h5'
      ? {
          ...keyValue,
          choices: [
            {
              name: 'vant',
              value: 'vant'
            },
            {
              name: 'none',
              value: 'none'
            }
          ]
        }
      : {
          ...keyValue,
          choices: [
            {
              name: 'element',
              value: 'element'
            },
            {
              name: 'antd',
              value: 'antd'
            },
            {
              name: 'none',
              value: 'none'
            }
          ]
        }
  }
  async isDirEmpty(path) {
    const fileList = await readdir(path)
    return !!fileList.length
  }
}

function init() {
  return new InitCommand(arguments)
}
module.exports = {
  init,
  InitCommand
}
