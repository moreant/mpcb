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

  getImgsDownNum (dirId) {
    return this.imgs.where({ dirId, download: '1' }).count()
  }

  getImgs (dirId) {
    return this.imgs.where({ dirId }).toArray()
  }
}