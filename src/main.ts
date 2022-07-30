import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './index.css'

const pinia = createPinia()
const app = createApp(App)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.use(pinia)
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
