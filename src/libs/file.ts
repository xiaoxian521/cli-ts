const fs = require('fs');

interface FileOperate {
  deleteFolder(path: string): Promise<any>
};

class OperateFile implements FileOperate {

  constructor() { }
  
  public deleteFolder = async (path: string): Promise<any> => {
    let files: Array<String> = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.map((file: String) => {
        let curPath: string = path + "/" + file
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteFolder(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(path)
    } else {
      return false
    }
  }

};

export const SyncFile = new OperateFile()