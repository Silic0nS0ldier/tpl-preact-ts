import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';

/** @type {import("rollup").InputOptions} */
const config = {
	input: 'src/index.tsx',
	output: {
		file: 'dist/bundle.js',
		format: 'iife',
	},
	external: [],
	plugins: [
		typescript(),
		alias({
			"react-dom": "node_modules/preact/compat/dist/compat.module.js",
			"react": "node_modules/preact/compat/dist/compat.module.js"
		}),
		nodeResolve({
			mainFields: ["module"],
		}),
		commonjs(),
		terser({
            mangle: {
                properties: true
            }
        })
	]
};

export default config;
