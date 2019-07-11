const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./webpack.config.base");

const dotenv = require("dotenv");

/**
 * get the env variables
 */
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    port: 4000,
    historyApiFallback: true
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
});
