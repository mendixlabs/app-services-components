const baseConfig = require("./node_modules/@mendix/pluggable-widgets-tools/configs/webpack.native.config.js");
const pngParser = {
    test: /\.(png|jpg|gif)$/,
    use: [
        {
            loader: "file-loader",
            options: {}
        }
    ]
};

baseConfig[0].module.rules.push(pngParser);

module.exports = baseConfig;
