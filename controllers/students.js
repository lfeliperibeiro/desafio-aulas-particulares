const fs = require("fs");
const data = require("../data.json");
const { graduation, date } = require("../utils");
const Intl = require("intl");

exports.index = function (req, res) {
  return res.render("students/index", { students: data.students });
};

exports.create = function (req, res) {
  return res.render("students/create");
};

exports.show = function (req, res) {
  const { id } = req.params;
  const foundstudent = data.students.find(function (student) {
    return student.id == id;
  });
  if (!foundstudent) return res.send("Professor não encontrado");

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).birthDay,
  };
  return res.render("students/show", { student });
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

  let id = 1;
  const lastStudent = data.students[data.students.length - 1];

  if (lastStudent) {
    id = lastStudent.id + 1;
  }

  data.students.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro na escrita do arquivo");

    return res.redirect("/students");
  });
};

exports.edit = function (req, res) {
  const { id } = req.params;
  const foundstudent = data.students.find(function (student) {
    return student.id == id;
  });
  if (!foundstudent) return res.send("Professor não encontrado");
  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).iso,
  };

  return res.render("students/edit", { student });
};

exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;
  const foundstudent = data.students.find(function (student, foundindex) {
    if (id == student.id) {
      index = foundindex;
      return true;
    }
  });
  if (!foundstudent) return res.send("Professor não encontrado");

  const student = {
    ...foundstudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };
  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Professor não encontrado");

    return res.redirect(`/students/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;
  const filteredstudents = data.students.filter(function (student) {
    return student.id != id;
  });

  data.students = filteredstudents;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Professor não encontrado");

    return res.redirect("/students");
  });
};
