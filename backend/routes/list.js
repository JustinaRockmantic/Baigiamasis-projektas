// const express = require("express");

// const { dbConnection } = require("../db");
// const { defaultCallback } = require("../helpers/dbHelper");
// const { verifyToken } = require("..//helpers/authenticationUtils");

// const router = express.Router();

// // router.get("/list", (req, res) => {
// //   dbConnection.execute("SELECT * FROM list", (err, result) =>
// //     defaultCallback(err, result, res)
// //   );
// // });

// // router.get("/list/:id", (req, res) => {
// //   const { id } = req.params;

// //   dbConnection.execute(
// //     "SELECT * FROM list WHERE email=?",
// //     [id],
// //     (err, result) => defaultCallback(err, result, res)
// //   );
// // });

// // router.post("/list", (req, res) => {
// //   const { name, surname, email, phone } = req.body;

// //   dbConnection.execute(
// //     `INSERT INTO list (name,
// //         surname,
// //         email,
// //         phone,)
// //           VALUES (?, ?, ?, ?)
// //           `,
// //     [name, surname, email, phone],
// //     (err, result) => defaultCallback(err, result, res)
// //   );
// // });

// // module.exports = router;
// router.get("/list", verifyToken, (req, res) => {
//   dbConnection.execute(
//     // "SELECT * FROM list",
//     "SELECT list.id, list.name, list.surname, list.email, list.phone, register.name as register_name, register.email FROM list LEFT JOIN register ON list.registratoriausId = register.id",
//     (err, result) => defaultCallback(err, result, res)
//   );
// });

// router.post(
//   "/list",
//   // verifyToken,
//   (req, res) => {
//     const {
//       body: { name, surname, email, phone, registratoriausId },
//     } = req;

//     dbConnection.execute(
//       "INSERT INTO list (name, surname, email, phone, registratoriausId) VALUES (?, ?, ?, ?, ?)",
//       [name, surname, email, phone, registratoriausId],
//       (err, result) => defaultCallback(err, result, res)
//     );
//   }
// );

// router.put("/list/:id", verifyToken, (req, res) => {
//   const { body } = req;
//   const { id } = req.params;

//   dbConnection.execute(
//     "UPDATE list SET name=?, surname=?, email=? phone=? registratoriausId=? WHERE id=?",
//     [
//       body.name,
//       body.surname,
//       body.email,
//       body.phone,
//       body.registratoriausId,
//       id,
//     ],
//     (err, result) => defaultCallback(err, result, res)
//   );
// });

// router.delete("/list/:id", verifyToken, (req, res) => {
//   const { id } = req.params;

//   dbConnection.execute("DELETE FROM list WHERE id=?", [id], (err, result) =>
//     defaultCallback(err, result, res)
//   );
// });

// module.exports = router;
const express = require("express");
const { dbConnection } = require("../db");
const { defaultCallback } = require("../helpers/dbHelper");
const { verifyToken } = require("..//helpers/authenticationUtils");

const router = express.Router();

router.get("/list", verifyToken, (req, res) => {
  dbConnection.execute(
    "SELECT list.id, list.name, list.surname, list.email, list.phone, register.name as register_name, register.email FROM list LEFT JOIN register ON list.registratoriausId = register.id",
    (err, result) => defaultCallback(err, result, res)
  );
});

router.post("/list", verifyToken, (req, res) => {
  const {
    body: { name, surname, email, phone, registratoriausId },
  } = req;

  dbConnection.execute(
    "INSERT INTO list (name, surname, email, phone, registratoriausId) VALUES (?, ?, ?, ?, ?)",
    [name, surname, email, phone, registratoriausId],
    (err, result) => defaultCallback(err, result, res)
  );
});

router.put("/list/:id", verifyToken, (req, res) => {
  const { body } = req;
  const { id } = req.params;

  dbConnection.execute(
    "UPDATE list SET name=?, surname=?, email=?, phone=?, registratoriausId=? WHERE id=?",
    [
      body.name,
      body.surname,
      body.email,
      body.phone,
      body.registratoriausId,
      id,
    ],
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
