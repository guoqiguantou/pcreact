// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
const browserSync =  require('browser-sync');
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
const historyApiFallback =  require('connect-history-api-fallback');
const webpack =  require('webpack');
const webpackDevMiddleware =  require('webpack-dev-middleware');
const webpackHotMiddleware =  require('webpack-hot-middleware');
const config =  require('./webpack-dev-config');
const proxy = require('http-proxy-middleware');

const bundler = webpack(config);

const apiProxy = proxy(['/api'], {
    //target: 'http://60.171.108.22:8002',
    target: 'http://127.0.0.1/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api' : '/',     // rewrite path
    },
});

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
    notify: false,
    port: 8886,
    ui: {
        port: 8889
    },
    server: {
        baseDir: 'src',

        middleware: [
            apiProxy,
            historyApiFallback(),

            webpackDevMiddleware(bundler, {
                // Dev middleware can't access config, so we provide publicPath
                publicPath: config.output.publicPath,

                // These settings suppress noisy webpack output so only errors are displayed to the console.
                noInfo: false,
                quiet: false,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false
                },

                // for other settings see
                // http://webpack.github.io/docs/webpack-dev-middleware.html
            }),

            // bundler should be the same as above
            webpackHotMiddleware(bundler)
        ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
        'src/*.html'
    ]
});
