import { Sig } from '@/types'
import OSS from '@/utils/OSS'
import { defineStore } from 'pinia'

interface AppStore {
  token: string
  sig: Sig | null
  ossInstance: OSS | null
}
export const useAppStore = defineStore('token', {
  state: (): AppStore => ({ token: '', sig: null, ossInstance: null })
})
