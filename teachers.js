const fs = require("fs");
const data = require("./data.json");

exports.post = function (req, res) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please fill all fields");
    }
  }
  let { avatar_url, name, birth, grau, classe, atuaction } = req.body;

  req.body.birth = Date.parse(req.body.birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    grau,
    classe,
    created_at,
    atuaction,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("white file error");

    return res.redirect("/teachers");
  });
 
};
