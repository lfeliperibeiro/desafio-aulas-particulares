const fs = require("fs");
const data = require("../data.json");
const { age, graduation, date } = require("../utils");
const Intl = require("intl");

exports.index = function (req, res) {
  return res.render("teachers/index", { teachers: data.teachers });
};

exports.create = function (req, res) {
  return res.render("teachers/create");
};

exports.show = function (req, res) {
  const { id } = req.params;
  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });
  if (!foundTeacher) return res.send("Professor não encontrado");

  const teacher = {
    ...foundTeacher,
    birth: age(foundTeacher.birth),
    services: foundTeacher.services.split(","),
    formation: graduation(foundTeacher.formations),
    created_at: new Intl.DateTimeFormat("pt-br").format(foundTeacher.create_at),
  };
  return res.render("teachers/show", { teacher });
};

exports.edit = function (req, res) {
  const { id } = req.params;
  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });
  if (!foundTeacher) return res.send("Professor não encontrado");
  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth),
  };

  return res.render("teachers/edit", { teacher });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha os campos vazios");
    }
  }

  let { avatar_url, name, birth, formations, classes, services } = req.body;
  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    formations,
    classes,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro na escrita do arquivo");

    return res.redirect("/teachers");
  });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;
  const foundTeacher = data.teachers.find(function (teacher, foundindex) {
    if (id == teacher.id) {
      index = foundindex;
      return true;
    }
  });
  if (!foundTeacher) return res.send("Professor não encontrado");

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };
  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Professor não encontrado");

    return res.redirect(`/teachers/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;
  const filteredTeachers = data.teachers.filter(function (teacher) {
    return teacher.id != id;
  });

  data.teachers = filteredTeachers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Professor não encontrado");

    return res.redirect("/teachers");
  });
};
