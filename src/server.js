const express = require("express");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");

const server = express();

const routes = require("./routes");

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5005, function () {
  console.log("server is running");
});
