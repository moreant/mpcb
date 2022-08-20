import { app, shell, dialog, ipcMain } from 'electron'
export interface Sig {
  region: string
  endpointImage: string
  securityToken: string
  bucket: string
  expiredTime: string
  accessKeyId: string
  regionImage: string
  endpoint: string
  accessKeySecret: string
}

import OSS from 'ali-oss'
import fs from 'fs'

export const OPEN_LINK = 'OPEN_LINK'
export const GET_DOWNLOADS_PATH = 'GET_DOWNLOADS_PATH'
export const OPEN_FILE_DIALOG = 'OPEN_FILE_DIALOG'

const openExtraLink = async (link = '') => {
  await shell.openExternal(link)
}

const getDownloadsPath = () => app.getPath('downloads')

const openFileDialog = async (oldPath: string = app.getPath('downloads')) => {
  const { filePaths } = await dialog.showOpenDialog({
    title: '选择下载位置',
    properties: ['openDirectory', 'createDirectory'],
    defaultPath: oldPath
  })
  return filePaths
}

const listenerEvent = () => {
  ipcMain.handle(OPEN_LINK, async (event, link: string) => openExtraLink(link))
  ipcMain.handle(GET_DOWNLOADS_PATH, () => getDownloadsPath())

  ipcMain.handle(OPEN_FILE_DIALOG, async (event, ...args: any[]) => openFileDialog(...args))

  ipcMain.handle('OSS_INIT', (event, ...args: any[]) => ossInit(...args))
  ipcMain.handle('GET_STRAME', (event, ...args: any[]) => getStream(...args))
}

let store: OSS | null = null

const getStream = async (...args: any[]) => {
  const url = args[0]
  const path = args[1]
  const fileNmae = args[2]
  if (!store) {
    return
  }
  console.log(url)
  const result = await store.getStream(url)
  await fs.promises.mkdir(path, { recursive: true })
  const writeStream = fs.createWriteStream(`${path}/${fileNmae}`)
  result.stream.pipe(writeStream)
}

const ossInit = (...args: any[]) => {
  const token = JSON.parse(args[0])
  store = new OSS({
    region: token.region,
    accessKeyId: token.accessKeyId,
    accessKeySecret: token.accessKeySecret,
    bucket: token.bucket,
    stsToken: token.securityToken
  })
}

export const registerDownloadService = (): void => {
  listenerEvent()
}
