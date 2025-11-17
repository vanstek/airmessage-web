/* eslint-env node */
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
require("dotenv").config();
// const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = (env) => ({
	entry: "./src/index.tsx",
	target: "web",
	mode: env.WEBPACK_SERVE ? "development" : "production",
	devtool: env.WEBPACK_SERVE ? "cheap-source-map" : "source-map",
	devServer: {
		static: {
			directory: path.join(__dirname, "public")
		},
		port: 8080,
		https: env.secure ? {
			key: fs.readFileSync("webpack.key"),
			cert: fs.readFileSync("webpack.crt"),
		} : undefined
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "index.js",
		assetModuleFilename: "res/[hash][ext][query]",
		publicPath: "",
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				],
				exclude: /\.module\.css$/
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: true
						}
					}
				],
				include: /\.module\.css$/
			},
			{
				test: /\.(svg)|(wav)$/,
				type: "asset/resource"
			},
			{
				test: /\.md$/,
				type: "asset/source"
			}
		]
	},
	resolve: {
		extensions: [
			".tsx",
			".ts",
			".js"
		],
		alias: {
			"shared": path.resolve(__dirname, "src")
		}
	},
	optimization: {
		usedExports: true
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		/* new ESLintPlugin({
			files: ["src", "browser", "electron-main", "electron-renderer"],
			extensions: ["js", "jsx", "ts", "tsx"]
		}), */
		new CopyPlugin({
			patterns: [
				{from: "public"}
			]
		}),
		new webpack.DefinePlugin({
			"WPEnv.ENVIRONMENT": JSON.stringify(env.WEBPACK_SERVE ? "development" : "production"),
			"WPEnv.PACKAGE_VERSION": JSON.stringify(process.env.npm_package_version),
			"WPEnv.RELEASE_HASH": "\"undefined\"",
			"WPEnv.BUILD_DATE": Date.now(),
			// Inject environment variables
			"process.env.REACT_APP_CONNECT_HOSTNAME": JSON.stringify(process.env.REACT_APP_CONNECT_HOSTNAME),
			"process.env.REACT_APP_GOOGLE_API_KEY": JSON.stringify(process.env.REACT_APP_GOOGLE_API_KEY),
			"process.env.REACT_APP_GOOGLE_CLIENT_ID": JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID),
			"process.env.REACT_APP_GOOGLE_CLIENT_SECRET": JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_SECRET),
			"process.env.REACT_APP_FIREBASE_API_KEY": JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
			"process.env.REACT_APP_FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
			"process.env.REACT_APP_FIREBASE_PROJECT_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_PROJECT_ID),
			"process.env.REACT_APP_FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
			"process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
			"process.env.REACT_APP_FIREBASE_APP_ID": JSON.stringify(process.env.REACT_APP_FIREBASE_APP_ID),
			"process.env.REACT_APP_SENTRY_DSN": JSON.stringify(process.env.REACT_APP_SENTRY_DSN),
			"process.env.REACT_APP_JWK_LOCAL_ENCRYPTION_KEY": JSON.stringify(process.env.REACT_APP_JWK_LOCAL_ENCRYPTION_KEY)
		}),
	].concat(!env.WEBPACK_SERVE ? new WorkboxPlugin.GenerateSW() : [])
});