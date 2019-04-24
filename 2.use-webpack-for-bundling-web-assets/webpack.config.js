const path = require("path"); // Import node path module

// html-webpack-plugin generates an HTML5 file that includes
// all webpack bundles in the <bod> using <script> tag
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // "production"
  entry: "./src/index.js", // script entry point
  output: {
    filename: "bundle.js", // resulting script file name
    path: path.join(__dirname, "dist") // output folder, should be an absolute path
  },
  devServer: {
    contentBase: "./dist", // webpack-dev-server root
    port: 3002 // port number
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [{ loader: "html-loader" }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/public/index.html", // source html file
      filename: "./index.html" // resulting html file name
    })
  ]
};
