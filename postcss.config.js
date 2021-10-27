// postcss.config.js
let patternForElement = /^el-/;

const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: ["./website/layouts/**/*.html", "./src/**/*.vue"],
    // whitelist: ["del", "ins"],
    whitelist: ["html", "body"],
    // whitelistPatterns: [/^\[data/, /revealed/, /hidden/, /sticked/, /iframe/],
    whitelistPatterns: [
        /^\[data/, 
        /revealed/, 
        /hidden/, 
        /sticked/, 
        /iframe/,
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
        /class/,
        patternForElement
    ],
    whitelistPatternsChildren: [/^token/, /^pre/, /^code/, patternForElement],
    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]*[\w-/:]/g) || []
});
module.exports = {
    plugins: [
        require("autoprefixer"),
        ...(process.env.NODE_ENV === "production" || process.env.NODE_ENV === "stage" ? [purgecss] : [])
    ]
};