const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("../package.json").dependencies;

const devConfig = {
	mode: "development",
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
	],
};

module.exports = merge(commonConfig, devConfig);
