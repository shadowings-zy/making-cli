# cli-maker（中文）

一个快速制作前端项目脚手架的工具。

## 使用说明

首先我们需要从 NPM 上下载`cli-maker`：

```bash
npm install -g cli-maker
```

之后，我们可以直接在命令行中使用它：

```bash
cli-maker --name xxxxx --output /aaa/bbb --config /ccc/ddd.js
```

`cli-maker`的配置项如下:

| option            | description        |
| ----------------- | ------------------ |
| --name [name]     | 脚手架名称         |
| --config [config] | 脚手架配置文件     |
| --output [output] | 输出脚手架文件目录 |

## 配置文件说明

`cli-maker`需要根据开发者自定义的脚手架配置文件来生成项目的脚手架。
`cli-maker`的工作流程很简单：
1、用户输入相关参数。
2、根据用户输入的参数判断对应的模板文件的 git 仓库地址。
3、clone git 仓库到对应位置并执行 npm install。

所以我们需要用一个配置文件来实现“处理用户输入的参数，并判断 git 仓库的地址”

### 编写配置文件

我们的配置文件需要导出一个名为 configProject()的函数，该函数的参数有：
| param | description |
| ----------------- | ------------------ |
| program | commander 包实例化出来的 commander 对象，详见[commander 说明文档](https://www.npmjs.com/package/commander) |

该函数必须返回一个对象，该对象必须有如下三个属性：
| param | description |
| ----------------- | ------------------ |
| prompts| inquirer 包中接收的 prompts 对象，用于接收用户输入，详见[inquirer 说明文档](https://www.npmjs.com/package/inquirer) |
| setProjectName| 根据用户输入的结果，设置项目名 |
| setProjectGitRepo| 根据用户输入的结果，设置 Git 仓库的地址 |

### 配置文件样例

```javascript
const fse = require('fs-extra')

/**
 * @param {*} program commander对象
 */
const configProject = (program) => {
  /**
   * inquirer 包中接收的 prompts 对象
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
   * 根据用户输入的结果，设置项目名
   */
  const setProjectName = (answer) => {
    return 'name'
  }

  /**
   * 根据用户输入的结果，设置Git仓库地址
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

# cli-maker(English)

A cli generator for making front-end project cli easily.

## usage

First, you need to install cli-maker from NPM.
`npm install -g cli-maker`

Next, you need to use cli-maker in this way:

```bash
cli-maker --name xxxxx --output /aaa/bbb --config /ccc/ddd.js
```

the option of `cli-maker` is:

| option            | description                          |
| ----------------- | ------------------------------------ |
| --name [name]     | name of cli                          |
| --config [config] | config file of cli                   |
| --output [output] | output path of generated cli project |

## configuration file

`cli-maker` needs to generate the cli by customizing cli configuration file.
The workflow of cli-maker is simple:

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
