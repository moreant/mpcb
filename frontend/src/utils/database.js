import Dexie from 'dexie';


export class Database extends Dexie {

  constructor() {
    super('database');

    this.version(1).stores({
      imgs: 'id,dirId,fileName,download',
    });

    this.imgs = this.table('imgs')


  }

  bulkAdd (items) {
    return this.imgs.bulkAdd(items)
  }

  getImgs (dirId) {
    return this.imgs.where({ ditId }).toArray()
  }
}