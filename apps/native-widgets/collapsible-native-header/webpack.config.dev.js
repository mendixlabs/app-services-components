const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const pkg = require('./package.json');

const args = process.argv.slice(2);

const baseConfig = require("./node_modules/@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");//Can also be webpack.config.prod.js

const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const customConfig = {
    resolve: {
        alias: {

        }
    }
};

const editorConfig = {

}

if (args.length === 5 && args[4] === "--analyze") {
    customConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], editorConfig)];
