const express = require("express");
const { dbConnection } = require("../db");
const { defaultCallback } = require("../helpers/dbHelper");

const router = express.Router();

router.get("/list", (req, res) => {
  dbConnection.execute(
    "SELECT * FROM list",

    (err, result) => {
      return defaultCallback(err, result, res);
    }
  );
});

router.post("/list", (req, res) => {
  const { name, surname, email, phone } = req.body;

  dbConnection.execute(
    "INSERT INTO list (name, surname, email, phone) VALUES (?, ?, ?, ?)",
    [name, surname, email, phone],
    (err, result) => {
      if (err) {
        return defaultCallback(err, null, res);
      }
      return defaultCallback(null, result, res);
    }
  );
});

router.put("/list/:id", (req, res) => {
  const { name, surname, email, phone } = req.body;
  const { id } = req.params;

  dbConnection.execute(
    "UPDATE list SET name=?, surname=?, email=?, phone=? WHERE id=?",
    [name, surname, email, phone, registratoriausId, id],
    (err, result) => {
      if (err) {
        return defaultCallback(err, null, res);
      }
      return defaultCallback(null, result, res);
    }
  );
});

router.delete("/list/:id", (req, res) => {
  const { id } = req.params;

  dbConnection.execute("DELETE FROM list WHERE id=?", [id], (err, result) => {
    if (err) {
      return defaultCallback(err, null, res);
    }
    return defaultCallback(null, result, res);
  });
});

module.exports = router;
