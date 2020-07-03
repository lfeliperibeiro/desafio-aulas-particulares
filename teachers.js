const fs = require("fs");
const data = require("./data.json");

exports.post = function (req, res) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha os campos vazios");
    }
  }

  let { avatar_url, name, birth, formation, classes, services } = req.body;
  birth = Date.parse(birth);
  const create_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    formation,
    classes,
    services,
    create_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro na escrita do arquivo");

    return res.redirect("/teachers");
  });
};
