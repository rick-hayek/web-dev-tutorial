// path.js
/**
 * Define all paths here, so we don't have to hard code paths everywhere.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appIndexJs: resolveApp("src/index.js"),
  appBuild: resolveApp("build"),
  appHtml: resolveApp("src/public/index.html")
};
