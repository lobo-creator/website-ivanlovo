import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/website-ivanlovo/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
