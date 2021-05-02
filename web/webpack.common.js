const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./scripts/index",
        me: "./scripts/me",
        admin: "./scripts/admin",
        common: "./scripts/common"
    },
    plugins: [new HtmlWebpackPlugin({ title: "Production" })],
    output: {
        clean: true,
        path: path.resolve(__dirname, "public", "dist"),
        filename: "[name].js"
    }
};
