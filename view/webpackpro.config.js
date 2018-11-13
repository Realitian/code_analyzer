const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        'index.js': [path.resolve(__dirname, 'js', 'main.js')]
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'js'),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
}
