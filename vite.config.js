import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vitePluginMpa from 'vite-plugin-mpa'

const mpa = vitePluginMpa.default ?? vitePluginMpa

export default defineConfig({
  plugins: [
    react(),
    mpa({
      open: '/',
    }),
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@nutui/nutui-react/dist/styles/variables.scss";@import "./src/styles/_variables.scss";`,
  //     },
  //   },
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
