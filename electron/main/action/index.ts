import { app, shell, dialog, ipcMain } from 'electron'

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
}

export const registerDownloadService = (): void => {
  listenerEvent()
}
