import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    // proxy: {
    //   '/api': {
    //     target: 'localhost:8010',    // 目标接口前缀
    //     //ws: true,       //  代理webscoked
    //     changeOrigin: true,   // 开启跨域
    //     rewrite: (path) => path.replace(/\/api/, '')  // 路径重写
    //   }
    // }
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8010/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/\/api/, '')  // 路径重写
    //   }
    // }
  },

  plugins: [vue(),
  Components({ resolvers: [VantResolver()] }),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
