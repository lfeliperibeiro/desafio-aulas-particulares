const { age, graduation, date } = require("../../lib/utils");
const Intl = require("intl");
const Teacher = require("../models/Teacher");

module.exports = {
  index(req, res) {
    Teacher.all((teachers) => {
      return res.render("teachers/index", { teachers });
    });
  },

  create(req, res) {
    return res.render("teachers/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
      Teacher.create(req.body, (teacher) => {
        return res.redirect(`/teachers/${teacher.id}`);
      });
    }
  },
  show(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) return res.send("Professor não encontrado");
      teacher.formations = graduation(teacher.formations);
      teacher.birth = age(teacher.birth);
      teacher.services = teacher.services.split(",");
      teacher.created_at = date(teacher.created_at).format;

      return res.render("teachers/show", { teacher });
    });
  },
  edit(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) return res.send("Professor não encontrado");
      teacher.formations = graduation(teacher.formations);
      teacher.birth = date(teacher.birth).iso;

      return res.render("teachers/edit", { teacher });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha os campos vazios");
      }
    }
    Teacher.update(req.body, () => {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },

  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect("/teachers");
    });
  },
};
