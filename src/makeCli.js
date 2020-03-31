const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const copyDir = require('copy-dir')
const { copy, copyFiles, modifyBinName } = require('./file-system-tools')

/**
 * 生成routing-controllers脚手架的配置
 * @param {*} program commander对象
 */
const makeCli = (program) => {
  const name = program.name
  const config = program.config
  const output = program.output
  const currentTemplate = path.join(process.cwd(), 'template')
  const outputDir = path.join(output, name)
  const outputConfig = path.join(outputDir, 'src', 'config.js')
  const outputPackageJson = path.join(outputDir, 'package.json')

  if (typeof name !== 'undefined' && typeof config !== 'undefined' && typeof output !== 'undefined') {
    copyDir.sync(currentTemplate, outputDir, { cover: true })
    copyFiles(config, outputConfig)
    modifyBinName(outputPackageJson, name)
    console.log(chalk.green('make cli successful'))
  } else {
    console.log(chalk.red('[make cli error] Incomplete parameters'))
  }
}

module.exports = makeCli
