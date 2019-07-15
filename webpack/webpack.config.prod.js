const merge = require("webpack-merge");
const workboxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");


const baseConfig = require("./webpack.config.base");


module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new workboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp("https://ah-premier-staging.herokuapp.com"),
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp("https://cdnjs.cloudflare.com/"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "cdn-cache"
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "google-fonts-stylesheets"
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-webfonts",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: new RegExp("https://i.imgur.com/"),
          handler: "CacheFirst",
          options: {
            cacheName: "imgur-images"
          }
        }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
        IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET
      }
    })
  ]
});
