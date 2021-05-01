const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./scripts/index",
        me: "./scripts/me",
        admin: "./scripts/admin",
        common: "./scripts/common"
    },
    output: {
        path: path.resolve(__dirname, "public", "dist"),
        filename: "[name].js"
    }
};
