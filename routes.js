const express = require("express");
const routes = express.Router();
const teachers = require("./teachers");
const { response } = require("express");

routes.get("/", function (req, res) {
  return res.redirect("/teachers");
});

routes.get("/teachers", function (req, res) {
  return res.render("teachers/index");
});

routes.get("/teachers/create", function (req, res) {
  return res.render("teachers/create");
});

routes.post("/teachers", teachers.post);

routes.get("/students", function (req, res) {
  return res.render("students");
});

module.exports = routes;
