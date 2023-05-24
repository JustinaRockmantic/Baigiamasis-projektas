const mysql = require("mysql2");

const databaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const dbConnection = mysql.createConnection({
  ...databaseConfig,
  database: "",
});

dbConnection.query("CREATE DATABASE IF NOT EXISTS baigiamasis", function (err) {
  if (err) throw err;
  console.log("Database baigiamasis created");

  dbConnection.query("USE baigiamasis", (err) => {
    if (err) throw err;

    const registerTableQuery = `
  CREATE TABLE IF NOT EXISTS register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

    const listTableQuery = `
  CREATE TABLE IF NOT EXISTS list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL
  );
`;

    dbConnection.query(registerTableQuery, (err) => {
      if (err) throw err;
      console.log("Register Table created");

      dbConnection.query(listTableQuery, (err) => {
        if (err) throw err;
        console.log("List Table created");
      });
    });
  });
});

const codeacademyConnection = mysql.createConnection({
  ...databaseConfig,
  database: "baigiamasis",
});

module.exports = {
  dbConnection,
  codeacademyConnection,
};
