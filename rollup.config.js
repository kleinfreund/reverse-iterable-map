import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  input: 'src/reverse-iterable-map.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    typescript(),
    terser(),
  ],
})
