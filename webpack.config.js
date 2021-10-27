// webpack v4
const path = require("path");
const Dotenv = require("dotenv-webpack");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
    resolve: {
        alias: {
            vue$: "vue/dist/vue.min.js" // 'vue/dist/vue.common.js' for webpack 1
        },
    },
    entry: { main: "./src/index.js", external: "./src/external.js" },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    devServer: {
        contentBase: path.join(process.cwd(), "./build"),
        compress: false,
        watchContentBase: true,
        quiet: false,
        open: true,
        port: 9000,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://dev-api.dididi.com',
                // ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                },
                debug: true
            }
        }
    },
    output: {
        path: path.join(__dirname, "./build"),
        publicPath: "/",
        filename: "assets/js/[name].[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                    {
                        loader: 'sass-resources-loader',
                        options: {resources: './src/scss/vars.scss'}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(gif|png|jpe?g|ico|svg)$/i,
                loader: "file-loader",
                options: {
                    // bypassOnDebug: true,
                    outputPath: "assets/img"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    outputPath: "assets/fonts"
                }
            }
        ]
    },
    plugins: [
        new Dotenv({
            path:
                process.env.NODE_ENV === "production"
                    ? "./.env.production"
                    : (process.env.NODE_ENV === "stage" ? "./.env.stage" : "./.env")
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash].css"
        }),
        new AssetsPlugin({
            filename: "webpack.json",
            path: path.join(process.cwd(), "website/data"),
            prettyPrint: true
        }),
        new WebpackMd5Hash()
    ],
};
