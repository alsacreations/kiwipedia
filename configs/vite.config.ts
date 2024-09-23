// vite.config.js
// https://vitejs.dev/guide/build.html

import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  // config options
  plugins: [UnoCSS()],
})
