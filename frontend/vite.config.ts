import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // resolve: {
  //   alias: {
  //     process: 'process/browser'
  //   }
  // },
  // define: {
  //   'process.env': {}, // This will make process.env available to libraries that expect it
  // },

  
})
