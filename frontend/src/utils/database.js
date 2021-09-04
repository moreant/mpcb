import Dexie from 'dexie';
export default class Database extends Dexie {

  constructor() {
    super('database');

    this.version(1).stores({
      imgs: 'id,[dirId+download],fileName,[dirId+url]',
    });

    this.imgs = this.table('imgs')


  }

  bulkImg (items) {
    return this.imgs.bulkAdd(items)
  }

  updateDownload (key) {
    return this.imgs.update(key, { download: '1' })
  }

  getImgsDownNum (dirId, flag) {
    return this.imgs.where({ dirId, download: flag }).count()
  }

  getImgs (query) {
    return this.imgs.where(query).toArray()
  }
}