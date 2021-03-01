const path = require('path')

const sourcePath = path.join(__dirname, './src')

module.exports = {
	mode: "development",
	entry: "./src/index.tsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: true
	},
	watchOptions: {
		poll: 1000
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
		alias: {
			"@components": path.resolve(sourcePath, "components"),
			"@models": path.resolve(sourcePath, "models"),
			"@views": path.resolve(sourcePath, "views"),
			"@store": path.resolve(sourcePath, "store"),
		},
		modules: [path.resolve('./src'), path.resolve('./node_modules')],
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
			{ test: /\.tsx?$/, loader: "babel-loader" },
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	}
};
