import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'react-portfolio-a1-rt.onrender.com' // leftover from previous project This one was built off a skeleton then modified  - to be removed
    ]
  }
})
