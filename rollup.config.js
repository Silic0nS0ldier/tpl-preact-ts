import del from "del";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import ignore from 'rollup-plugin-ignore';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import done from './tasks/rollup/rollup-plugin-done';

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
        ignore(
            [
                "preact/debug",
            ]
        ),
		nodeResolve({
			mainFields: ["module"],
        }),
		commonjs(),
		terser({
            mangle: {
                properties: true
            }
        }),
        done(
            async function () {
                // Clear target folder
                await del("./dist/**/*");
            }
        )
	]
};

export default config;
