// Import node path module
const path = require("path");

// html-webpack-plugin generates an HTML5 file that includes
// all webpack bundles in the <bod> using <script> tag
const HtmlWebPackPlugin = require("html-webpack-plugin");

// css-mini-extract-plugin extracts styles to an external stylesheet file,
// and injects it into HTML file by creating a <link> tag in <head> element
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require("./paths");

module.exports = {
  mode: "production",
  entry: paths.appIndexJs, // script entry point
  output: {
    filename: "static/js/[name].[contenthash:8].js", // resulting script file name
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    path: paths.appBuild, // output folder, should be an absolute path
    publicPath: paths.publicPath
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all" // put everything from node_modules into vender.js; others go to main.js
    }
    //runtimeChunk: true
  },
  devServer: {
    contentBase: paths.appBuild, // webpack-dev-server root
    port: 3003, // port number
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: [/\.(css)$|\.(scss)$/],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          require.resolve("css-loader")
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/image/[hash:16].[ext]" // Resulting image file
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: paths.appHtml, // source html file
      filename: "index.html", // resulting html file name
      favicon: paths.appFavIcon
    }),
    new MiniCssExtractPlugin({
      filename: "static/style/[contenthash:16].css" // resulting stylesheet file
    })
  ]
};
