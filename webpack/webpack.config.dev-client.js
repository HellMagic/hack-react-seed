var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var node_modules_path = path.resolve(__dirname, '..', 'node_modules');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var commonLoaders = [
    {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        query: {
            "presets": ["react-hmre", "es2015", "react", "stage-0"],
            "plugins": [ "transform-runtime", "add-module-exports", "transform-decorators-legacy", "transform-react-display-name" ]
        },
        include: path.join(__dirname, '..', 'app'),
        exclude: path.join(__dirname, '/node_modules/')
    },
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

var postCSSConfig = function() {
    return [
        require('postcss-import')({
            path: path.join(__dirname, '..', 'app', 'css'),
            // addDependencyTo is used for hot-reloading in webpack
            addDependencyTo: webpack
        }),
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

module.exports = {
    devtool: 'eval',
    name: 'browser',
    context: path.join(__dirname, '..', 'app'),
    entry: {
        app: ['./main/client', hotMiddlewareScript]
    },
    output: {
        path: assetsPath,
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
        loaders: commonLoaders.concat([
            {
                test: /\.css$/,
                loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
            },
            {test: /\.less$/, loaders: ['style', 'css', 'autoprefixer', 'less']}
        ])
        // noParse: [pathToReact]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
            'app', 'node_modules'
        ]
        // alias: {
        //     'react': path.join(node_modules_path, 'react/react.js'),
        //     'react-dom': path.join(node_modules_path, 'react-dom/dist/react-dom.min.js'),
        //     'redux': path.join(node_modules_path, 'redux/dist/redux.min.js'),
        //     'react-redux': path.join(node_modules_path, 'react-redux/dist/react-redux.min.js')
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEVCLIENT__: true,
            __DEVSERVER__: false
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        })
    ],
    postcss: postCSSConfig
};
