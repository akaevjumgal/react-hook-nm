const path = require('path')

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
		extensions: [".ts", ".tsx", ".js", ".json"]
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
