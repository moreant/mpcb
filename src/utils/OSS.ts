import OSS from 'ali-oss'
import dayjs from 'dayjs'
import { Sig } from '@/types/index'

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

  downImg = async (url: string) => {
    console.log(this.client?.getStream, this.client?.get)
    const res = await this.client?.getStream(url)
    return res
  }

  getBuffer = (url: string) => this.client?.get(url)

  getUrl = (url: string) => this.client?.signatureUrl(url)

  getExpiredTimeDayjs = () => dayjs(this.expiredTime)
}

export default OOS
