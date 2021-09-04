let OSS = require('ali-oss');
class OOS {

  constructor({ region = '', accessKeyId = '', bucket = '', accessKeySecret = '', securityToken = '' }) {
    this.client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
      stsToken: securityToken
    });
  }

  downImg = async (url, saveUrl) => {
    try {
      await this.client.get(url, saveUrl);
    }
    catch (e) {
      console.log(e);
    }
  }

  getBuffer = async (url) => {
    try {
      return await (await this.client.get(url)).content;
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = OOS