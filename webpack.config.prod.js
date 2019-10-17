const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");

const args = process.argv.slice(2);

const baseConfig = require("./node_modules/@mendix/pluggable-widgets-tools/configs/webpack.config.prod.js");//Can also be webpack.config.prod.js

const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// We're doing dirty hacking, because our camel case stuff doesn't transpile nicely to ES5. Need another solution, but this works in IE11
baseConfig[0].module.rules[1].exclude = /node_modules\/(?!(@thi.ng)\/).*/
baseConfig[0].module.rules[1].use.options.presets[0] = [
    '@babel/preset-env',
    {
        "targets": {
            "browsers": ["last 2 versions", "ie >= 11"],
        },
        "useBuiltIns": "usage",
        "corejs": "2"
    }
]
baseConfig[1].module.rules[1].exclude = /node_modules\/(?!(@thi.ng)\/).*/
baseConfig[1].module.rules[1].use.options.presets[0] = [
    '@babel/preset-env',
    {
        "targets": {
            "browsers": ["last 2 versions", "ie >= 11"],
        },
        "useBuiltIns": "usage",
        "corejs": "2"
    }
]

const customConfig = {
    // Custom configuration goes here
    devtool: false,
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        passes: 2
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: {
                        comments: false
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            }),
          ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        // We only include the moment locale for en-gb, as this is not used in a lot of places and we don't need all the locales
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/)
    ],
    // We add this to further slim down the package
    resolve: {
        alias: {
            '@ant-design/icons/lib/dist$': path.join(__dirname, 'src/components/icons.js')
        }
    }
};

if (args.length === 5 && args[4] === "--analyze") {
    customConfig.plugins.push(new BundleAnalyzerPlugin());
}

const previewConfig = {
    // Custom configuration goes here
    // devtool: "source-map"
    plugins: [
        // new BundleAnalyzerPlugin(),
        // We only include the moment locale for en-gb, as this is not used in a lot of places and we don't need all the locales
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/)
    ],
    resolve: {
        alias: {
            '@ant-design/icons/lib/dist$': path.join(__dirname, 'src/components/icons.js')
        }
    }
};

module.exports = [merge(baseConfig[0], customConfig), merge(baseConfig[1], previewConfig)];
