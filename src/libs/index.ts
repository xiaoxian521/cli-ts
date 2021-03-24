const clear = require('clear')
const chalk = require('chalk')
const { promisify } = require("util")
import { clone } from './download'
const figlet = promisify(require('figlet'))
const log = (content: string) => console.log(chalk.green(content))

export const init = async (name: string): Promise<any>  => {
    clear()
    const data = await figlet('CLI')
    log(data)
    const remote = "https://gitee.com/yiming_chang/CURD-TS.git"
    // log(`开始创建项目:` + name)
    console.log('=======>', name)
    await clone(remote, ["doc", "-b"])
}