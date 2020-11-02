import path from "path";
import { Configuration } from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
// import cssnano from "cssnano";

import { SERVER_PORT, IS_DEV, WEBPACK_PORT } from "./src/server/config";

const plugins = [new ManifestPlugin()];

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// plugins.push(new BundleAnalyzerPlugin());

const nodeModulesPath = path.resolve(__dirname, "node_modules");
const targets = IS_DEV ? { chrome: "79", firefox: "72" } : "> 0.25%, not dead";

const config: Configuration = {
    mode: IS_DEV ? "development" : "production",
    devtool: IS_DEV ? "inline-source-map" : false,
    entry: ["./src/client/client"],
    output: {
        path: path.join(__dirname, "dist", "statics"),
        filename: "[name]-[hash:8]-bundle.js",
        chunkFilename: "[name]-[hash:8]-bundle.js",
        publicPath: "/statics/",
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".graphql", ".gql"],
        alias: {
            ejs: "ejs.min.js",
        },
    },
    optimization: {
        minimize: !IS_DEV,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    priority: 10,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(graphql|gql)$/,
                exclude: [/node_modules/, nodeModulesPath],
                loader: "graphql-tag/loader",
            },
            {
                exclude: [/node_modules/, nodeModulesPath],
                test: /\.graphql$/,
                use: [{ loader: "graphql-import-loader" }],
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, nodeModulesPath],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/env", { modules: false, targets }],
                            "@babel/react",
                            "@babel/typescript",
                        ],
                        plugins: [
                            "@babel/proposal-numeric-separator",
                            "@babel/plugin-transform-runtime",
                            [
                                "@babel/plugin-proposal-decorators",
                                { legacy: true },
                            ],
                            [
                                "@babel/plugin-proposal-class-properties",
                                { loose: true },
                            ],
                            "@babel/plugin-proposal-object-rest-spread",
                            "babel-plugin-graphql-import",
                        ],
                    },
                },
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: [/node_modules/, nodeModulesPath],
                loader: "graphql-tag/loader",
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // modules: true,
                            // localsConvention: "camelCase",
                            // sourceMap: IS_DEV,
                        },
                    },
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         sourceMap: IS_DEV,
                    //         plugins: IS_DEV ? [cssnano()] : [],
                    //     },
                    // },
                ],
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         {
            //             loader: "style-loader",
            //         },
            //         {
            //             loader: "css-loader",
            //         },
            //         {
            //             loader: "less-loader",
            //             options: {
            //                 lessOptions: {
            //                     strictMath: true,
            //                     javascriptEnabled: true,

            //                 },
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.(graphql|gql)$/,
                exclude: [/node_modules/, nodeModulesPath],
                loader: "graphql-tag/loader",
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    "primary-color": "#1DA57A",
                                    "link-color": "#1DA57A",
                                    "border-radius-base": "2px",
                                },
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: [/node_modules/, nodeModulesPath],
                loader: "graphql-tag/loader",
            },
            {
                test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
                use: "url-loader?limit=10000",
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: [/node_modules/, nodeModulesPath],
                loader: "graphql-tag/loader",
            },
        ],
    },
    devServer: {
        port: WEBPACK_PORT,
        overlay: IS_DEV,
        open: IS_DEV,
        openPage: `http://localhost:${SERVER_PORT}`,
    },
    plugins,
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
};

// eslint-disable-next-line import/no-default-export
export default config;
