var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = [
    {
    node: {
        fs: 'empty',
        net: 'empty',
        __dirname: false
    },
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './app/app.ts',
    output: {
        // globalObject: "this",
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        // libraryTarget: 'umd'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.graphql', '.jsx', '.tsx', '.ts', '.js', '.json', '.css'],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/],
            }
            ,{
                test:/\.css$/,
                use:['css-loader']
            }
        ],
    },
    // externals: {
	// 	"react": "React",
	// 	"react-dom/server": "ReactDOMServer"
	// },
},
{
    mode: 'development',
    target: 'web',
    entry: {
        'home.js': path.resolve(__dirname, 'view/admin/index.ts'),
        // 'multipleRoutes.js': path.resolve(__dirname, 'view/portfolio/routes.js')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [ '.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
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
        // globalObject: "this",
        // libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name]'
    },
    	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	// externals: {
	// 	"react": "React",
	// 	"react-dom": "ReactDOM"
	// },
}]
