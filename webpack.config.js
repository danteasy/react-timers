const path = require("path");

module.exports = {
    resolve: {
        alias: {
            root: __dirname,
            "@": path.resolve(__dirname, "src"),
        },
        extensions: [".tsx", ".ts"],
    },
};
