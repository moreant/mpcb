"use strict";
const electron = require("electron");
const node_os = require("node:os");
const node_path = require("node:path");
const OSS = require("ali-oss");
const fs = require("fs");
const OPEN_LINK = "OPEN_LINK";
const GET_DOWNLOADS_PATH = "GET_DOWNLOADS_PATH";
const OPEN_FILE_DIALOG = "OPEN_FILE_DIALOG";
const openExtraLink = async (link = "") => {
  await electron.shell.openExternal(link);
};
const getDownloadsPath = () => electron.app.getPath("downloads");
const openFileDialog = async (oldPath = electron.app.getPath("downloads")) => {
  const { filePaths } = await electron.dialog.showOpenDialog({
    title: "选择下载位置",
    properties: ["openDirectory", "createDirectory"],
    defaultPath: oldPath
  });
  return filePaths;
};
const listenerEvent = () => {
  electron.ipcMain.handle(OPEN_LINK, async (event, link) => openExtraLink(link));
  electron.ipcMain.handle(GET_DOWNLOADS_PATH, () => getDownloadsPath());
  electron.ipcMain.handle(OPEN_FILE_DIALOG, async (event, ...args) => openFileDialog(...args));
  electron.ipcMain.handle("OSS_INIT", (event, ...args) => ossInit(...args));
  electron.ipcMain.handle("GET_STRAME", async (event, ...args) => getStream(...args));
};
let store = null;
const getStream = async (...args) => {
  const url2 = args[0];
  const path = args[1];
  const fileNmae = args[2];
  if (!store) {
    return;
  }
  const result = await store.getStream(url2);
  await fs.promises.mkdir(path, { recursive: true });
  return new Promise((resolve, reject) => {
    try {
      const writeStream = fs.createWriteStream(`${path}/${fileNmae}`);
      result.stream.pipe(writeStream);
      writeStream.on("finish", () => {
        console.log(fileNmae);
        resolve();
      });
      writeStream.on("error", (err) => {
        console.error("ababab", err);
        reject(err);
      });
    } catch (e) {
      reject(e);
    }
  });
};
const ossInit = (...args) => {
  const token = JSON.parse(args[0]);
  store = new OSS({
    region: token.region,
    accessKeyId: token.accessKeyId,
    accessKeySecret: token.accessKeySecret,
    bucket: token.bucket,
    stsToken: token.securityToken
  });
};
const registerDownloadService = () => {
  listenerEvent();
};
process.env.DIST_ELECTRON = node_path.join(__dirname, "..");
process.env.DIST = node_path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? node_path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (node_os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
const preload = node_path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = node_path.join(process.env.DIST, "index.html");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Main window",
    icon: node_path.join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  registerDownloadService();
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.on("will-navigate", (event, url2) => {
    event.preventDefault();
    electron.shell.openExternal(url2);
  });
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
//# sourceMappingURL=index.js.map
