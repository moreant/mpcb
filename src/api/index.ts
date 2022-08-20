import request from '@/utils/request'
import qs from 'qs'
import OOS from '@/utils/OSS'
import { AlbumList, Basic, DirList, Sig } from '@/types'
import { useAppStore } from '@/store/token'

let oos: OOS

const api = {
  sig: 'https://mzstorage.meizu.com/file/get_sig',
  dirList: 'https://mzstorage.meizu.com/album/dir/list',
  albumList: 'https://mzstorage.meizu.com/album/list'
}

const getToken = () => {
  const appStore = useAppStore()
  return appStore.token
}

export const getOSSInfo = (token: string) => {
  const params = {
    type: '2',
    token
  }
  return request.post<any, Basic<Sig>>(api.sig, qs.stringify(params))
}

export const getDirList = () => {
  const params = {
    limit: 1000,
    order: 1,
    token: getToken()
  }
  return request.post<void, Basic<DirList>>(api.dirList, qs.stringify(params))
}

export const getAlbumList = (dirId: number, fileNum = 10000) => {
  const params = {
    order: 1,
    offset: 0,
    limit: fileNum,
    dirId,
    token: getToken()
  }
  return request.post<void, Basic<AlbumList>>(api.albumList, qs.stringify(params))
}

export const getIcon = (url: string) => oos.getUrl(url)
