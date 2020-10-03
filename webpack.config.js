/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    resolve : {
        extensions: [".ts", ".vue"],
        alias: {
            "vue$": path.resolve(__dirname, "node_modules", "vue", "dist", "vue.esm.js")
        }
    },
    entry: {
        lib: path.resolve(__dirname, "src", "index.ts")
    },
    output: {
        library: "keiryo",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        sourceMapFilename: "index.js.map"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: { appendTsSuffixTo: [/\.vue$/] }
            }
        ]
    },
    mode: "production",
    devtool: "source-map",
    plugins: [
        new VueLoaderPlugin()
    ]
}
