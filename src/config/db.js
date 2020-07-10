const { Pool } = require("pg");

module.exports = new Pool({
  user: "felipe",
  password: 12144,
  host: "localhost",
  port: 5432,
  database: "teachers",
});
