require('babel-core/register');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config');

new WebpackDevServer(webpack({
    entry: [

        // For hot style updates
        'webpack/hot/only-dev-server',
        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production		
        path: config.distDir,
        filename: config.dev
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        // Used for hot-reload
        new webpack.HotModuleReplacementPlugin()
    ]
}), {
    publicPath: 'http://localhost:8080/assets/',
    // Configure hot replacement
    hot: true,
    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    historyApiFallback: {
        index: './templates/index.html'
    },
    progress: true,
    stats: {
        colors: true
    }
    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
}).listen(8080, 'localhost', function(err, result) {

    if (err) {
        console.log(err);
    }
    console.log('The asset server is running at localhost: 8080');
});