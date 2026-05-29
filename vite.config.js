import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginMpa from 'vite-plugin-mpa'

const mpa = vitePluginMpa.default ?? vitePluginMpa

export default defineConfig({
  plugins: [
    react(),
    mpa({
      open: '/',
    }),
  ],
})
