/**
 * 统一响应
 */
export interface Basic<T> {
  code: number,
  message: string,
  value?: T
}

/**
 * 签名
 */
export interface Sig {
  region: string,
  endpointImage: string,
  securityToken: string,
  bucket: string,
  expiredTime: string,
  accessKeyId: string,
  regionImage: string,
  endpoint: string,
  accessKeySecret: string
}

/**
 * 目录
 */
export interface Dir {
  id: number,
  dirName: string,
  icon: string,
  fileNum: number,
  downNum: number,
  downPath: string
}

/**
 * 相册
 */
export interface Album {
  id: number,
  fileName: string,
  dirId: string,
  dirName: string,
  url: string,
  download: string,
}

/**
 * 目录列表
 */
export interface DirList {
  time: number,
  count: number,
  dir: Array<Dir>
}


/**
 * 相册列表
 */
export interface AlbumList {
  time: number,
  count: number,
  file: Array<Album>
}