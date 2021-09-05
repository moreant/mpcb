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
    await this.client.get(url, saveUrl);
  }

  getBuffer = async (url) => {
    return await (await this.client.get(url)).content;
  }

}

module.exports = OOS