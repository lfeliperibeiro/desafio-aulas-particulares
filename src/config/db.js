const { Pool } = require("pg");

const db = new Pool({
  user: "felipe",
  password: 12144,
  host: "localhost",
  port: 5432,
  database: "teachers",
});
