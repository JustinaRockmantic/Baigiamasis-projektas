const express = require("express");

const { dbConnection } = require("../db");
const { defaultCallback } = require("../helpers/dbHelper");

const router = express.Router();

// router.get("/list", (req, res) => {
//   dbConnection.execute("SELECT * FROM list", (err, result) =>
//     defaultCallback(err, result, res)
//   );
// });

// router.get("/list/:email", (req, res) => {
//   const { email } = req.params;

//   dbConnection.execute(
//     "SELECT * FROM list WHERE email=?",
//     [email],
//     (err, result) => defaultCallback(err, result, res)
//   );
// });

// router.post("/list", (req, res) => {
//   const { name, surname, email, phone } = req.body;

//   dbConnection.execute(
//     `INSERT INTO list (name,
//         surname,
//         email,
//         phone,)
//           VALUES (?, ?, ?, ?)
//           `,
//     [name, surname, email, phone],
//     (err, result) => defaultCallback(err, result, res)
//   );
// });

// module.exports = router;
router.get("/list", verifyToken, (req, res) => {
  dbConnection.execute("SELECT * FROM list", (err, result) =>
    defaultCallback(err, result, res)
  );
});

router.post("/list", verifyToken, (req, res) => {
  const {
    body: { name, surname, email, phone },
  } = req;

  dbConnection.execute(
    "INSERT INTO list (name, surname, email, phone) VALUES (?, ?, ?, ?)",
    [name, surname, email, phone],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.put("/list/:id", verifyToken, (req, res) => {
  const { body } = req;
  const { id } = req.params;

  dbConnection.execute(
    "UPDATE list SET name=?, surname=?, email=? phone=? WHERE id=?",
    [body.name, body.surname, body.email, body.phone, id],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.delete("/list/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  dbConnection.execute("DELETE FROM list WHERE id=?", [id], (err, result) =>
    defaultCallback(err, result, res)
  );
});

module.exports = router;
