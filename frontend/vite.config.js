import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const base = mode === 'mock' ? '/mpcb' : '/'
  const outDir = mode === 'webify' ? './dist' :'../docs'
  return {
    base,
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3005',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      outDir
    }

  }
})
