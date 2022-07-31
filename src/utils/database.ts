import { Dir } from '@/types'
import Dexie from 'dexie'

export class Database extends Dexie {
  imgs
  errorLog

  constructor() {
    super('database')

    this.version(1).stores({
      imgs: 'id,dirId,[dirId+download],fileName,[dirId+url]',
      errorLog: 'key++,dirId,time,msg'
    })

    this.imgs = this.table('imgs')
    this.errorLog = this.table('errorLog')
  }

  bulkImg(items: Array<Dir>) {
    return this.imgs.bulkAdd(items)
  }

  updateDownload(key: number, download: '0' | '1') {
    return this.imgs.update(key, { download })
  }

  getImgsDownNum(dirId: number, flag: string) {
    return this.imgs.where({ dirId, download: flag }).count()
  }

  getImgs(query: object) {
    return this.imgs.where(query).toArray()
  }

  addErrorlog(item: object) {
    return this.errorLog.add(item)
  }

  getAllErrorLog() {
    return this.errorLog.reverse().sortBy('keys')
  }

  deleteAllErrorLog() {
    return this.errorLog.clear()
  }
}

export const IS_DOWNLOAD = '1'
export const NO_DOWNLOAD = '0'
