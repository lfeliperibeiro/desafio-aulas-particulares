const fs = require("fs");
const data = require("./data.json");
const { age, graduation } = require("./utils");
const Intl = require("intl");

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
