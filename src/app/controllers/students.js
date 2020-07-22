const { age, graduation, date } = require("../../lib/utils");
const Intl = require("intl");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    let {filter, page, limit} = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page -1)
    const params = {
      filter, 
      page, 
      limit,
      offset,
      callback(students){
        const pagination = {
          total: Math.ceil(students[0].total/ limit),
          page
        }
        return res.render("students/index", { students, pagination, filter });
      }
    }
    Student.paginate(params)
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
    }
    Student.create(req.body, (student) => {
      return res.redirect(`/students/${student.id}`);
    });
    
  },
  show(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Professor não encontrado");
      student.birth = date(student.birth).birthDay;
      return res.render("students/show", { student });
    });
  },
  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Professor não encontrado");
      student.birth = date(student.birth).iso;
      Student.teachersSelectOption((options) => {
        return res.render("students/edit",{student, teachersSelectOption: options });        
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
