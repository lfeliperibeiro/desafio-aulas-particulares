const { age, graduation, date } = require("../../lib/utils");
const Intl = require("intl");

module.exports = {
  index(req, res) {
    return res.render("students/index", { students: data.students });
  },

  create(req, res) {
    return res.render("students/create");
  },
  show(req, res) {
    const { id } = req.params;
    const foundstudent = data.students.find(function (student) {
      return student.id == id;
    });
    if (!foundstudent) return res.send("Professor não encontrado");

    return;
  },
  edit(req, res) {
    const { id } = req.params;
    const foundstudent = data.students.find(function (student) {
      return student.id == id;
    });
    if (!foundstudent) return res.send("Professor não encontrado");

    return;
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
    }

    return res.redirect("/students");
  },
  put(req, res) {
    const { id } = req.body;
    let index = 0;
    const foundstudent = data.students.find(function (student, foundindex) {
      if (id == student.id) {
        index = foundindex;
        return true;
      }
    });
    if (!foundstudent) return res.send("Professor não encontrado");

    return res.redirect(`/students/${id}`);
  },

  delete(req, res) {
    const { id } = req.body;
    const filteredstudents = data.students.filter(function (student) {
      return student.id != id;
    });
    return res.redirect("/students");
  },
};
