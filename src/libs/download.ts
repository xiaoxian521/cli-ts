const ora = require('ora')
const chalk = require('chalk')
const process = require('process')
import simpleGit, { SimpleGit, SimpleGitOptions, SimpleGitProgressEvent } from 'simple-git'

const spinner = ora()

const progress = ({ progress }: SimpleGitProgressEvent) => {
    let proText = `当前下载进度: ${chalk.green(progress + '%')}`
    spinner.start().text = proText
    if (progress === 100) {
        spinner.start().text = proText + chalk.green(' 下载完成')
    }
}

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    progress
};

// https://git-scm.com/docs/git-clone#Documentation/git-clone.txt
export const clone = async (repo: string, options: string[]): Promise<any> => {
    const git: SimpleGit = simpleGit(gitOptions)
    await git.clone(repo, options)
    spinner.start().stopAndPersist()
    process.exit()
}


