const ora = require('ora')
const chalk = require('chalk')
const process = require('process')
import simpleGit, { SimpleGitProgressEvent } from 'simple-git'

const spinner = ora()

const progress = ({ progress }: SimpleGitProgressEvent) => {
    let proText = `当前下载进度: ${chalk.green(progress + '%')}`
    spinner.start().text = proText
    if (progress === 100) {
        spinner.start().text = proText + chalk.green(' 下载完成')
    }
}

export const clone = async (repo: string, branch: string): Promise<any> => {
    const git = simpleGit({ progress: progress })
    await git.clone(repo, branch)
    spinner.start().stopAndPersist()
    process.exit()
}


