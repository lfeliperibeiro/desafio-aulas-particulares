const { age, graduation, date } = require("../../lib/utils");
const Intl = require("intl");
const Teacher = require("../model/Teacher");

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

    return res.redirect("/teachers");
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
    return;
  },

  edit(req, res) {
    return;
  },
  put(req, res) {
    return;
  },

  delete(req, res) {
    return;
  },
};
