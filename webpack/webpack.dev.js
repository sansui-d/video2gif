const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        host: "0.0.0.0",
        port: 8081,
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            inject: "body",
            hash: false,
        }),
    ],
});