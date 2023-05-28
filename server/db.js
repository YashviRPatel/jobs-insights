const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin@1234",
  database: "Jobs_Insights",
});

module.exports = pool;
