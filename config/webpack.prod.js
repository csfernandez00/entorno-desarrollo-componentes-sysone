const { merge } = require("webpack-merge");
const { DefinePlugin } = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const devConfig = {
	mode: "production",
	output: {
		publicPath: `${process.env.REACT_APP_PRODUCTION_URL}/`,
	},

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},

	devServer: {
		port: process.env.REACT_APP_PRODUCTION_PORT,
		historyApiFallback: {
			index: "/index.html",
		},
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "production",
			filename: "remoteEntry.js",
			remotes: {},
			exposes: {
				"./ProductionApp": "./src/bootstrap",
			},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new DefinePlugin({
			"process.env": {
				REACT_APP_PRODUCTION_URL: JSON.stringify(
					process.env.REACT_APP_PRODUCTION_URL
				),
				REACT_APP_PRODUCTION_PORT: JSON.stringify(
					process.env.REACT_APP_PRODUCTION_PORT
				),
				REACT_APP_API_BASE_URL: JSON.stringify(
					process.env.REACT_APP_API_BASE_URL
				),
			},
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
