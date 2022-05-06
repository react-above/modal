import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslintPlugin from 'vite-plugin-eslint';

const config = defineConfig({
  build: {
    outDir: 'demo-dist'
  },
  plugins: [tsconfigPaths(), eslintPlugin()],
  server: {
    host: true,
  },
})

export default config
