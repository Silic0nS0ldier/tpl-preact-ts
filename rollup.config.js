import del from "del";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import ignore from 'rollup-plugin-ignore';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import done from './tasks/rollup/rollup-plugin-done';

/**
 * @type {import("rollup").Plugin[]}
 */
const corePlugins = [
    typescript(),
    alias({
        "react-dom": "node_modules/preact/compat/dist/compat.module.js",
        "react": "node_modules/preact/compat/dist/compat.module.js"
    }),
];

/** @type {import("rollup").InputOptions[]} */
const config = [
    // SSR tooling
    {
        input: "src/index.server.tsx",
        output: {
            file: "tasks/ssr/server.js",
            format: "cjs",
        },
        external: [
            "html-minifier",
            "fs",
        ],
        plugins: [
            ...corePlugins,
            done(
                async function () {
                    // Clear target folder
                    await del("./tasks/ssr/server.js");
                }
            )
        ],
    },
    // Client side application, SSR tooling must be built first
    {
        input: 'src/index.client.tsx',
        output: {
            file: 'dist/bundle.js',
            format: 'iife',
        },
        plugins: [
            ...corePlugins,
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

                    // Create index.html (hack used to exclude from config compilation)
                    (await import((() => "./tasks/ssr/server")()))
                        .writeIndex("./dist/index.html");
                }
            )
        ]
    }
];

export default config;
