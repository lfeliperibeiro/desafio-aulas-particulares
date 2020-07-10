const { age, graduation, date } = require("../../lib/utils");
const Intl = require("intl");

module.exports = {
  index(req, res) {
    return res.render("teachers/index", { teachers: data.teachers });
  },

  create(req, res) {
    return res.render("teachers/create");
  },
  show(req, res) {
    const { id } = req.params;
    const foundTeacher = data.teachers.find(function (teacher) {
      return teacher.id == id;
    });
    if (!foundTeacher) return res.send("Professor não encontrado");

    return;
  },
  edit(req, res) {
    const { id } = req.params;
    const foundTeacher = data.teachers.find(function (teacher) {
      return teacher.id == id;
    });
    if (!foundTeacher) return res.send("Professor não encontrado");

    return;
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
    }

    return res.redirect("/teachers");
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;
    const foundTeacher = data.teachers.find(function (teacher, foundindex) {
      if (id == teacher.id) {
        index = foundindex;
        return true;
      }
    });
    if (!foundTeacher) return res.send("Professor não encontrado");

    return res.redirect(`/teachers/${id}`);
  },

  delete(req, res) {
    const { id } = req.body;
    const filteredTeachers = data.teachers.filter(function (teacher) {
      return teacher.id != id;
    });
    return res.redirect("/teachers");
  },
};
