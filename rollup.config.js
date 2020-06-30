// Based on example: https://github.com/rollup/rollup-starter-lib
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
	// browser-friendly UMD builds
  {
		input: 'index.js',
		output: {
			name: 'bigr',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find node libs
      commonjs(), // so Rollup can convert CommonJS modules to an ES modules
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })
		]
  },
  {
		input: 'index.js',
		output: {
			name: 'bigr',
			file: pkg.browsermin,
			format: 'umd'
		},
		plugins: [
			resolve(), 
      commonjs(),
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
		]
	},
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
    input: 'index.js',
    external: ['proj4'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];