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
    port: 3000
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8010/',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
  //   }
  // },
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
