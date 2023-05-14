const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoapp",
  password: "250602",
  port: 5432,
});

module.exports = pool;
