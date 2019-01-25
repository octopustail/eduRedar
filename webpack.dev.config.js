const path = require('path')
const webpack = require('webpack')
module.exports = {
    
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname,'src/index.js')],

    output:{
        path:path.join(__dirname,'public'),
        filename:'bundle.js'
    },
    
    /* 定位报错位置 */
    devtool:'inline-source-map',

    devServer:{
        contentBase: './public',
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            include: path.join(__dirname, 'src')
        }]
    }
}