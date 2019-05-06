// Import node path module
const path = require("path");

// html-webpack-plugin generates an HTML5 file that includes
// all webpack bundles in the <bod> using <script> tag
const HtmlWebPackPlugin = require("html-webpack-plugin");

// css-mini-extract-plugin extracts styles to an external stylesheet file,
// and injects it into HTML file by creating a <link> tag in <head> element
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require("./paths");

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

module.exports = {
  mode: "development", // "production"
  entry: paths.appIndexJs, // script entry point
  output: {
    //filename: "bundle.js", // resulting script file name
    path: paths.appBuild // output folder, should be an absolute path
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
        use: [{ loader: "html-loader" }]
      },
      {
        test: [/\.(css)$|\.(scss)$/],
        //use: [{ loader: "style-loader" }, { loader: "css-loader" }] // for inline style
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"
          //"sass-loader"
        ] // for external style file
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]" // Resulting image file
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: paths.appHtml // source html file
      //filename: "./index.html" // resulting html file name
    }),
    new MiniCssExtractPlugin({
      filename: "main.css" // resulting stylesheet file
    })
  ]
};
