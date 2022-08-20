import OSS from 'ali-oss'
import dayjs from 'dayjs'
import { Sig } from '@/types/index'
import fs from 'fs';

class OOS {
  client: OSS | undefined
  expiredTime: string | undefined

  constructor(token: Sig) {
    if (token) {
      this.client = new OSS({
        region: token.region,
        accessKeyId: token.accessKeyId,
        accessKeySecret: token.accessKeySecret,
        bucket: token.bucket,
        stsToken: token.securityToken
      })
      this.expiredTime = token.expiredTime
    }
  }

  downImg = async (url: string, saveUrl: string) => {
    const result = await this.client?.getStream(url)
    const ws = fs.createWriteStream(saveUrl)
    result?.stream.pipe(ws)
  }

  getBuffer = (url: string) => this.client?.get(url)

  getUrl = (url: string) => this.client?.signatureUrl(url)

  getExpiredTimeDayjs = () => dayjs(this.expiredTime)
}

export default OOS
