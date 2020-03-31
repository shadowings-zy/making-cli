# making-cli（中文）

一个快速制作前端项目脚手架的工具。

## 使用说明

首先我们需要从 NPM 上下载`making-cli`：

```bash
npm install -g making-cli
```

之后，我们可以直接在命令行中使用它：

```bash
making-cli --name xxxxx --output /aaa/bbb --config /ccc/ddd.js
```

`making-cli`的配置项如下:

| option            | description        |
| ----------------- | ------------------ |
| --name [name]     | 脚手架名称         |
| --config [config] | 脚手架配置文件     |
| --output [output] | 输出脚手架文件目录 |

## 配置文件说明

`making-cli`需要根据开发者自定义的脚手架配置文件来生成项目的脚手架。
`making-cli`的工作流程很简单：
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