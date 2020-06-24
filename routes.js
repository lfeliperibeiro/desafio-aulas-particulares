const express = require("express");
const routes = express.Router();

routes.get("/", function (require, response) {
  return response.redirect("/teachers");
});

routes.get("/teachers", function (require, response) {
  return response.render("teachers/index");
});

routes.get("/students", function (require, response) {
  return response.render("students");
});

module.exports = routes;
