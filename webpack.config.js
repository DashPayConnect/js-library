const path = require('path');

const webConfig = {
    entry: './src/index.browser.js',
    mode: 'development',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        filename: 'dashpay-connect.min.js',
        // fixes ReferenceError: window is not defined
        globalObject: "(typeof self !== 'undefined' ? self : this)",
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "buffer": require.resolve("buffer/"),
            "fs": false,
            "path": require.resolve("path-browserify"),
            "process": require.resolve("process/browser"),
            "assert": require.resolve("assert/"),
            "url": require.resolve("url/"),
            "crypto": require.resolve("crypto-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "zlib": require.resolve("browserify-zlib"),
            events: require.resolve('events/'),
            string_decoder: require.resolve('string_decoder/'),
            // tls: require.resolve('tls/'),
            // net: require.resolve('net/'),
            // Browser build have to use native WebSocket
            // ws: require.resolve('./build-utils/ws'),
        }
    },
};
module.exports = webConfig;
