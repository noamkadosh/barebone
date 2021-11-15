import * as path from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
	mode: 'production',
	entry: path.resolve(__dirname, 'src', 'server.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js'
	},
	target: 'node',
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.graphql$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader'
			}
		]
	}
};

export default config;
