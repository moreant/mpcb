import Dexie from 'dexie';
export class Database extends Dexie {

  constructor() {
    super('database');

    this.version(1).stores({
      imgs: 'id,dirId,[dirId+download],fileName,[dirId+url]',
    });

    this.imgs = this.table('imgs')


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
}

export const IS_DOWNLOAD = '1'
export const NO_DOWNLOAD = '0'