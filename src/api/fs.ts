import { useAppStore } from '@/store/token'

export const downImgToDist = async (dir: string, url: string, fileName: string) => {
  const appStore = useAppStore()
  await window.fs.promises.mkdir(dir, { recursive: true })
  // const res = await appStore.ossInstance?.getBuffer(url)
  await appStore.ossInstance?.downImg(url,`${dir}/${fileName}`)
  // await window.fs.promises.writeFile(`${dir}/${fileName}`, res?.content)
}
