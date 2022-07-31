interface Window {
  $dialog: import('naive-ui/lib/dialog').DialogProviderInst
  $message: import('naive-ui/lib/message').MessageProviderInst
  $notification: import('naive-ui/lib/notification').NotificationProviderInst
  $loadingBar: import('naive-ui/lib/loading-bar').LoadingBarProviderInst
  fs: import('fs')
  ipcRenderer: import('electron').IpcRenderer
}
