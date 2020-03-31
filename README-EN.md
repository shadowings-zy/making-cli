# making-cli(English)

A cli generator for making front-end project cli easily.

## usage

First, you need to install making-cli from NPM.
`npm install -g making-cli`

Next, you need to use making-cli in this way:

```bash
making-cli --name xxxxx --output /aaa/bbb --config /ccc/ddd.js
```

the option of `making-cli` is:

| option            | description                          |
| ----------------- | ------------------------------------ |
| --name [name]     | name of cli                          |
| --config [config] | config file of cli                   |
| --output [output] | output path of generated cli project |

## configuration file

`making-cli` needs to generate the cli by customizing cli configuration file.
The workflow of making-cli is simple:

1. The user enters relevant parameters.
2. Determine the git repo path of the project template according to the parameters entered by the user.
3. Clone git repo and execute npm install.

So we need to use a configuration file to "process the parameters entered by users and determine the address of git repo"

### coding configuration file

Our configuration file needs `configProject()` function:
| param | description |
| ----------------- | ------------------ |
| program | commander Object, check here for detail: [commander document](https://www.npmjs.com/package/commander) |

`configProject()` function must return an Object contains following property：
| param | description |
| ----------------- | ------------------ |
| prompts| inquirer Object, check here for detail: [inquirer document](https://www.npmjs.com/package/inquirer) |
| setProjectName| set project name by user input |
| setProjectGitRepo| set git repo by user input |

### 配置文件样例

```javascript
const fse = require('fs-extra')

/**
 * @param {*} program commander object
 */
const configProject = (program) => {
  /**
   * inquirer object
   */
  const prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目目录名：'
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择使用的后台框架',
      choices: [
        { title: 'exress', value: 'express' },
        { title: 'koa', value: 'koa' }
      ]
    }
  ]

  /**
   * set project name by user input
   */
  const setProjectName = (answer) => {
    return 'name'
  }

  /**
   * set git repo by user input
   */
  const setProjectGitRepo = (answer) => {
    return 'direct:https://github.com/xxx/xxx-koa.git'
  }

  return {
    prompts,
    setProjectName,
    setProjectGitRepo
  }
}

module.exports = configProject
```
