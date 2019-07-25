const merge = require("webpack-merge");
const workboxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const ReplacePlugin = require("webpack-plugin-replace");
const CopyPlugin = require("copy-webpack-plugin");

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
      "process.env": {
        IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
        IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET,
        BACKEND_LINK: process.env.BACKEND_LINK,
        FRONTEND_LINK: process.env.FRONTEND_LINK,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
      }
    }),
    new ReplacePlugin({
      exclude: [/node_modules/],
      include: [filepath => filepath.includes("index.html")],
      values: {
        "http://localhost:4000": process.env.XML_SEARCH_LINK
      }
    }),
    new CopyPlugin([{ from: "production_search.xml", to: "search.xml" }])
  ]
});
