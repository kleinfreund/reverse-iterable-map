import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/reverse-iterable-map.ts',
    output: {
      format: 'umd',
      name: 'ReverseIterableMap',
      exports: 'named',
      file: 'dist/reverse-iterable-map.js',
    },
    plugins: [
      typescript(),
      terser(),
    ],
  },
]
