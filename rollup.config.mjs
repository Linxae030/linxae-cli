import TypescriptPlugin from "@rollup/plugin-typescript";
import CommonjsPlugin from "@rollup/plugin-commonjs";
import NodeResolvePlugin from "@rollup/plugin-node-resolve";
import DtsPlugin from "rollup-plugin-dts";
import json from "@rollup/plugin-json";
import { cleandir as CleandirPlugin } from "rollup-plugin-cleandir";
import { terser as TerserPlugin } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
const PLUGINS = [
    TypescriptPlugin(),
    CommonjsPlugin(),
    // TerserPlugin({
    //     compress: { drop_console: false },
    //     format: { comments: false }
    // }),
    CleandirPlugin("./dist"),
    json(),
    copy({
        targets: [{ src: "lib/template/*", dest: "dist/template" }]
    })
];

export default {
    input: "./lib/index.ts",
    output: {
        file: "dist/index.js",
        format: "cjs"
    },
    plugins: PLUGINS
};
