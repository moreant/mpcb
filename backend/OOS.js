let OSS = require('ali-oss');
class OOS {

  constructor(token) {
    if (token) {
      this.client = new OSS({
        region: token.region,
        accessKeyId: token.accessKeyId,
        accessKeySecret: token.accessKeySecret,
        bucket: token.bucket,
        stsToken: token.securityToken
      });
    }
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