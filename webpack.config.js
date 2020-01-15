var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = [{
    node: {
        fs: 'empty',
        net: 'empty',
        __dirname: false
    },
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.graphql', '.jsx', '.js', '.css'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties']
                    // targets: {
                    //     node: true,
                    // },
                },
            }
            ,{
                test:/\.css$/,
                use:['css-loader']
            }
        ],
    },
},
{
    mode: 'development',
    target: 'web',
    entry: {
        'home.js': path.resolve(__dirname, 'view/admin/index.tsx'),
        // 'multipleRoutes.js': path.resolve(__dirname, 'view/portfolio/routes.js')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                presets: ['react', 'es2015'],
                plugins: ['transform-class-properties']
              }
            }
        },{
            test:/\.css$/,
            use:['css-loader']
        }]
    },
    optimization: {
        splitChunks: {
        chunks: 'all'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name]'
    }
}]
