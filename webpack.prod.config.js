var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');

config.entry = './src/index';
config.output.path = './dist';

module.exports = config;
