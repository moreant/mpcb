import OSS from '@/utils/OSS'
import { defineStore } from 'pinia'

interface AppStore {
  token: string
  ossInstance: OSS | null
}
export const useAppStore = defineStore('token', {
  state: (): AppStore => ({ token: '', ossInstance: null })
})
