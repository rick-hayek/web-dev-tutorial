import "./style/index.css";
import inlineStyle from "./style/inline.css";
const background = require("./image/blog-image.jpg");

console.log("Hello webpack!");

console.log(background);
var img = document.createElement("img");
img.src = background;

var container = document.getElementById("app");
container.appendChild(img);
