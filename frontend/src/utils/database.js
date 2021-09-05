import Dexie from 'dexie';
export class Database extends Dexie {

  constructor() {
    super('database');

    this.version(1).stores({
      imgs: 'id,dirId,[dirId+download],fileName,[dirId+url]',
      errorLog: 'key++,dirId,time,msg'
    });

    this.imgs = this.table('imgs')
    this.errorLog = this.table('errorLog')

  }

  bulkImg (items) {
    return this.imgs.bulkAdd(items)
  }

  updateDownload (key, download) {
    return this.imgs.update(key, { download })
  }

  getImgsDownNum (dirId, flag) {
    return this.imgs.where({ dirId, download: flag }).count()
  }

  getImgs (query) {
    return this.imgs.where(query).toArray()
  }

  addErrorlog (item) {
    return this.errorLog.add(item)
  }

  getAllErrorLog () {
    return this.errorLog.reverse().sortBy('keys')
  }

  deleteAllErrorLog () {
    return this.errorLog.clear()
  }
}

export const IS_DOWNLOAD = '1'
export const NO_DOWNLOAD = '0'