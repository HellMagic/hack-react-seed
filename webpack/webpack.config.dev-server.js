var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var commonLoaders = [
    {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        query: {
            "presets": ["es2015", "react", "stage-0"],
            "plugins": [ "transform-runtime", "add-module-exports", "transform-decorators-legacy", "transform-react-display-name" ]
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
    { test: /\.html$/, loader: 'html-loader' }
];

module.exports = {
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
        server: "./main/server"
    },
    target: "node",
    output: {
        path: assetsPath,
        filename: "server.js",
        publicPath: "/assets/",
        libraryTarget: "commonjs2"
    },
    module: {
        loaders: commonLoaders.concat([
            {
                test: /\.css$/,
                loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {test: /\.less$/, loaders: ['style', 'css', 'autoprefixer', 'less']}
        ])
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
            "app", "node_modules"
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: true
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        })
    ]
};
