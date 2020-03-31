const inquirer = require('inquirer')
const fse = require('fs-extra')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const { exec } = require('child_process')

const initProject = (prompts, setProjectName, setProjectGitRepo) => {
  const store = memFs.create()
  const memFsEditor = editor.create(store)

  inquirer.prompt(prompts).then((answer) => {
    const projectName = setProjectName(answer)
    const projectGitRepo = setProjectGitRepo(answer)
    generate(projectName, projectGitRepo, memFsEditor)
  })
}

const generate = (projectName, projectGitRepo, memFsEditor) => {
  const projectPath = path.join(process.cwd(), projectName)
  const downloadPath = path.join(projectPath, 'temp_download')

  const downloadSpinner = ora('start download')
  downloadSpinner.start()

  // 下载git repo
  download(projectGitRepo, downloadPath, { clone: true }, (err) => {
    if (err) {
      downloadSpinner.color = 'red'
      downloadSpinner.fail(err.message)
      return
    }

    downloadSpinner.color = 'green'
    downloadSpinner.succeed('download successful')

    // 复制文件
    const copyFiles = fse.readdirSync(downloadPath)

    copyFiles.forEach((file) => {
      fse.copySync(path.join(downloadPath, file), path.join(projectPath, file))
      console.log(`${chalk.green('✔ ')}${chalk.grey(`${projectName}/${file}`)}`)
    })

    memFsEditor.commit(() => {
      fse.remove(downloadPath)

      process.chdir(projectPath)

      // git 初始化
      const gitInitSpinner = ora(`execute ${chalk.green.bold('git init')}`)
      gitInitSpinner.start()

      const gitInit = exec('git init')
      gitInit.on('close', (code) => {
        if (code === 0) {
          gitInitSpinner.color = 'green'
          gitInitSpinner.succeed(chalk.green('git init successful'))
        } else {
          gitInitSpinner.color = 'red'
          gitInitSpinner.fail(chalk.red('git init failed'))
        }

        // 安装依赖
        const installSpinner = ora(`execute ${chalk.green.bold('npm install')}`)
        installSpinner.start()
        exec('npm install', (error, stdout, stderr) => {
          if (error) {
            installSpinner.color = 'red'
            installSpinner.fail(chalk.red('npm install failed'))
            console.log(error)
          } else {
            installSpinner.color = 'green'
            installSpinner.succeed(chalk.green('npm install successful'))
            console.log(`${stderr}${stdout}`)
          }

          console.log(chalk.green('initialize project complete'))
          console.log(chalk.green('happy coding'))
        })
      })
    })
  })
}

module.exports = initProject
