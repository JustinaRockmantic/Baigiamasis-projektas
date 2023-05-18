const express = require("express");
const { dbConnection } = require("../db");
const { defaultCallback } = require("../helpers/dbHelper");

const router = express.Router();

router.get("/registration", (req, res) => {
  dbConnection.execute(`SELECT * FROM admin_registration`, (err, result) => {
    defaultCallback(err, result, res);
  });
});

router.get("/list", (req, res) => {
  dbConnection.execute(`SELECT * FROM event_participants`, (err, result) => {
    defaultCallback(err, result, res);
  });
});

router.post("/registration", (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  const postQuery =
    "INSERT INTO admin_registration (email, first_name, last_name, password) VALUES (?, ?, ?, ?)";
  dbConnection.execute(
    postQuery,
    [email, first_name, last_name, password],
    (err, result) => {
      defaultCallback(err, result, res);
    }
  );
});

router.post("/list", (req, res) => {
  const { first_name, last_name, email, phone_number } = req.body;

  const postQuery =
    "INSERT INTO event_participants (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)";
  dbConnection.execute(
    postQuery,
    [first_name, last_name, email, phone_number],
    (err, result) => {
      defaultCallback(err, result, res);
    }
  );
});

module.exports = router;
