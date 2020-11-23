const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:{
        modules: ['react','react-dom'],
    },
    output:{
        library: '[name]',
        filename:'[name].js',
        publicPath: '/',
        path: path.resolve('dist'),
    },
    plugins:[
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname,'[name]-manifest.json'),
        })
    ]
};