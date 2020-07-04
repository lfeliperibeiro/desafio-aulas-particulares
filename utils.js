module.exports = {
  age: function age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month == 0 && today.getDate() <= birthDate.getDate())) {
      age = age - 1;
    }
    return age;
  },
  graduation: function formations(education) {
    const formantions = [
      "Ensino médio Completo",
      "Ensino Superior Completo",
      "Mestrado",
      "Doutorado",
    ];
    for (let formation of formantions) {
      if (education == [formation]) {
        return formations;
      }
    }
  },
};
