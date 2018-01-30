/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler } = require( '@ckeditor/ckeditor5-dev-utils' );
const { getPostCssConfig } = require( '@ckeditor/ckeditor5-dev-utils' ).styles;
const BabiliPlugin = require( 'babel-minify-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const buildConfig = require( './build-config' );

module.exports = {
	devtool: 'source-map',

	entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),

	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default',
		library: buildConfig.moduleName
	},

	plugins: [
		new ExtractTextPlugin( 'styles.css' ),
		/*new BabiliPlugin( null, {
			comments: false
		} ),*/
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )/*,
		new webpack.optimize.ModuleConcatenationPlugin()*/
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						'sass-loader'
					]
				} )
			}
		]
	}
};
