const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "../dist"),
    },
    module: {
        rules: [
            {
                // 解析html中的src路径并加载js中引入的html资源
                test: /\.html$/,
                use: "html-loader",
            },
            {
                // 对图片资源文件进行处理
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: "asset",
                exclude: [path.resolve(__dirname, "src/assets/imgs")],
                generator: {
                    filename: "imgs/[name].[contenthash][ext]",
                },
            },
            {
                // 对字体资源文件进行处理
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: "asset",
                generator: {
                    filename: "fonts/[name].[contenthash][ext]",
                },
            },
            { // 对音频资源文件进行处理
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: "asset",
                exclude: [path.resolve(__dirname, "src/assets/medias")],
                generator: {
                    filename: "medias/[name].[contenthash][ext]",
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-proposal-class-properties",
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
    ],
};