import { useAppStore } from '@/store/token'
import { spawn } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

export const downImgToDist = async (dir: string, url: string, fileName: string) => {
  const appStore = useAppStore()
  await window.fs.promises.mkdir(dir, { recursive: true })
  const res = await appStore.ossInstance?.getBuffer(url)
  await window.fs.promises.writeFile(`${dir}/${fileName}`, res?.content)
}

// open folder cross platform
export const openDownloadFloder = (dirPath: string) => {
  const command = os.platform() == 'win32' ? 'explorer' : 'darwin' ? 'open' : 'xdg-open'
  if (!fs.existsSync(dirPath)) {
    const upperLevelPath = path.dirname(dirPath)
    if (fs.existsSync(upperLevelPath)) {
      fs.mkdirSync(dirPath)
      spawn(command, [dirPath])
    } else alert(`选择的目录不存在！文件夹路径：${upperLevelPath}`)
  } else spawn(command, [dirPath])
}
