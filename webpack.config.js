var fs = require('fs');
var path = require('path');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    entry: './server/index.ts',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './build/server')
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            //{ test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: { fix: true } },
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    externals: nodeModules,
    target: 'node'
}