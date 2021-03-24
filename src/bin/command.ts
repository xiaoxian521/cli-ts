const glob = require('glob')
const program = require('commander')
const inquirer = require('inquirer') //命令行答询
import { SyncFile } from '../libs/file'
import { init } from '../libs/index'
program.version(require('../package.json').version)

// 在 node process 中有一个 unhandledRejection 事件，当没有对 Promise 的 rejection 进行处理就会抛出这个事件（这只对原生 Promise 有效）
process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error)
});

const list: Array<string> = glob.sync('*') // 遍历当前目录

// 初始化项目
const choices: Array<string> = ['vue', 'react', 'angular', 'doc', 'backend']

inquirer.prompt([{
  type: 'checkbox',
  message: 'Select projects',
  name: 'projects',
  choices,
}]).then(({ projects }: any) => {
  let indexs: Array<any> = []

  // 找出已存在目录在当前所选中选项中的索引
  indexs = list.map((v: string) => {
    return projects.findIndex(((value: string) => value == v))
  }).filter((v: number) => v !== -1)

  const deepHandle = (len: any[]): void => {
    if (len.length === 0) {
      program
        .command('create <name>')
        .description('create project template...')
        .action(async (name: any, cmd: any) => {
          // @ts-ignore
          projects.forEach((v:string) => {
            init(v)
          })
        })

      program.parse(process.argv)
    } else {
      inquirer.prompt([{
        type: 'confirm',
        message: `当前目录已存在${projects[len[0]]}项目，是否删除重新创建?`,
        name: 'answers',
      }]).then((answers: any) => {
        if (answers.answers) {
          SyncFile.deleteFolder(`${process.cwd()}/${projects[len[0]]}`)
            .then(() => {
              len.splice(0, 1)
              if (len.length > 0) deepHandle(indexs)
            })
            .catch(() => {
              process.exit()
            })
        }
      })
    }
   
  }

  deepHandle(indexs)

})