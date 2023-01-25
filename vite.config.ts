import path from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: 'plugins',
      fileName: (format) => `plugins.${format}.js`,
      formats: ['es', 'cjs'],
    },
  }
})
