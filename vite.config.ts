import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint';

const config = defineConfig({
  build: {
    outDir: 'dist/demo'
  },
  plugins: [eslintPlugin()],
  server: {
    host: true,
  },
})

export default config
