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

dbConnection.query(
  "CREATE DATABASE IF NOT EXISTS registration_info",
  function (err) {
    if (err) throw err;
    console.log("Database registration_info created");

    dbConnection.query("USE registration_info", (err) => {
      if (err) throw err;

      //   const registrationTableQuery = `
      //           CREATE TABLE IF NOT EXISTS posts (
      //             id INT AUTO_INCREMENT PRIMARY KEY,
      //             email VARCHAR(255) UNIQUE NOT NULL,
      //             first_name VARCHAR(255) NOT NULL,
      //             last_name VARCHAR(255) NOT NULL,
      //             password VARCHAR(255) NOT NULL
      //           );
      //           CREATE TABLE event_participants (
      //             id INT AUTO_INCREMENT PRIMARY KEY,
      //             first_name VARCHAR(255) NOT NULL,
      //             last_name VARCHAR(255) NOT NULL,
      //             email VARCHAR(255) UNIQUE NOT NULL,
      //             phone_number VARCHAR(20) NOT NULL
      //         );
      //           `;
      //   dbConnection.query(registrationTableQuery, (err) => {
      //     if (err) throw err;
      //     console.log("Registration Table created");
      //   });
      // });
      const registrationTableQuery = `
  CREATE TABLE IF NOT EXISTS admin_registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

      const eventParticipantsTableQuery = `
  CREATE TABLE IF NOT EXISTS event_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL
  );
`;

      dbConnection.query(registrationTableQuery, (err) => {
        if (err) throw err;
        console.log("Registration Table created");

        dbConnection.query(eventParticipantsTableQuery, (err) => {
          if (err) throw err;
          console.log("Event Participants Table created");
        });
      });
    });
  }
);
module.exports = {
  dbConnection,
};
