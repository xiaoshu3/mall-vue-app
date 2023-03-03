import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from '@/router'

import { Button } from 'vant'
const app = createApp(App)

// 注册路由
app.use(router)

app.use(Button)

app.mount('#app')
