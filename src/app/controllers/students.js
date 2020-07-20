const { age, graduation, date } = require("../../lib/utils");
const Intl = require("intl");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    Student.all((students) => {
      return res.render("students/index", { students });
    });
  },

  create(req, res) {
    Student.teachersSelectOption((options) => {
      return res.render("students/create", { teachersSelectOption: options });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
      Student.create(req.body, (student) => {
        return res.redirect(`/students/${student.id}`);
      });
    }
  },
  show(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Professor não encontrado");
      student.birth = age(student.birth);
      return res.render("students/show", { student });
    });
  },
  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Professor não encontrado");
      student.birth = date(student.birth).iso;
      Student.teachersSelectOption((options) => {
        return res.render("students/create",{student, teachersSelectOption: options });        
      });      
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
    }
    Student.update(req.body, () => {
      return res.redirect(`/students/${req.body.id}`);
    });
  },

  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect("/students");
    });
  },
};
