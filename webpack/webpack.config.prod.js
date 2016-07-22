var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "..", "public", "assets");
var publicPath = "/assets/";

var commonLoaders = [
    {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        query: {
            "presets": ["es2015", "react", "stage-0"],
            "plugins": [
                "transform-runtime",
                "add-module-exports",
                "transform-decorators-legacy",
                "transform-react-display-name",
                "transform-react-remove-prop-types",
                "transform-react-constant-elements",
                "transform-react-inline-elements"
            ]
        },
        include: path.join(__dirname, '..', 'app'),
        exclude: path.join(__dirname, '/node_modules/')
    },
    { test: /\.json$/, loader: "json-loader" },
    {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
            name: '[hash].[ext]',
            limit: 10000,
        }
    },
    { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader')
    },
    {test: /\.less$/, loaders: ['style', 'css', 'autoprefixer', 'less']}
];

var postCSSConfig = function() {
    return [
        require('postcss-import')(),
        // Note: you must set postcss-mixins before simple-vars and nested
        require('postcss-mixins')(),
        require('postcss-simple-vars')(),
        // Unwrap nested rules like how Sass does it
        require('postcss-nested')(),
        //  parse CSS and add vendor prefixes to CSS rules
        require('autoprefixer')({
          browsers: ['last 2 versions', 'IE > 8']
        }),
        // A PostCSS plugin to console.log() the messages registered by other
        // PostCSS plugins
        require('postcss-reporter')({
          clearMessages: true
        })
    ];
};

module.exports = [
    {
        name: "browser",
        devtool: "source-map",
        context: path.join(__dirname, "..", "app"),
        entry: {
            app: "./main/client"
        },
        output: {
            path: assetsPath,
            filename: "[name].js",
            publicPath: publicPath

        },

        module: {
            loaders: commonLoaders
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css'],
            modulesDirectories: [
                "app", "node_modules"
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: 3
            }),
            // extract inline css from modules into separate files
            new ExtractTextPlugin("styles/main.css"),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                __DEVCLIENT__: false,
                __DEVSERVER__: false
            }),
            new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' }),
            new webpack.ProvidePlugin({
                "$": "jquery",
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'root.jQuery': 'jquery'
            })
        ],
        postcss: postCSSConfig
        // alias: {
        //     'react': path.join(node_modules_path, 'react/react.js'),
        //     'redux': path.join(node_modules_path, 'redux/dist/redux.min.js'),
        //     'react-redux': path.join(node_modules_path, 'react-redux/dist/react-redux.min.js')
        // }
    }, {
        name: "server-side rendering",
        context: path.join(__dirname, "..", "app"),
        entry: {
            server: "./main/server"
        },
        target: "node",
        output: {
            path: assetsPath,
            filename: "server.js",
            publicPath: publicPath,
            libraryTarget: "commonjs2"
        },
        module: {
            loaders: commonLoaders
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css'],
            modulesDirectories: [
                "app", "node_modules"
            ]
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new ExtractTextPlugin("styles/main.css"),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                },
                sourceMap: true //用户在线上生成source map文件
            }),
            new webpack.DefinePlugin({
                __DEVCLIENT__: false,
                __DEVSERVER__: false
            }),
            new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' }),
            new webpack.ProvidePlugin({
                "$": "jquery"
            })
        ],
        postcss: postCSSConfig
        // alias: {
        //     'react': path.join(node_modules_path, 'react/react.js'),
        //     'redux': path.join(node_modules_path, 'redux/dist/redux.min.js'),
        //     'react-redux': path.join(node_modules_path, 'react-redux/dist/react-redux.min.js')
        // }
    }
];
