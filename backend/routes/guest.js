// // const express = require("express");

// // const { registrationConnection } = require("../db");
// // const { defaultCallback } = require("../helpers/dbHelper");

// // const router = express.Router();

// // router.get("/list", (req, res) => {
// //   registrationConnection.execute(
// //     "SELECT * FROM event_participants",
// //     (err, result) => defaultCallback(err, result, res)
// //   );
// // });

// // router.get("/event_participants/:email", (req, res) => {
// //   const { email } = req.params;

// //   registrationConnection.execute(
// //     "SELECT * FROM event_participants WHERE email=?",
// //     [email],
// //     (err, result) => defaultCallback(err, result, res)
// //   );
// // });

// // router.post("/list", (req, res) => {
// //   const { first_name, last_name, email, phone_number } = req.body;

// //   registrationConnection.execute(
// //     `INSERT INTO products (
// //         first_name,
// //         last_name,
// //         email,
// //         phone_number)
// //         VALUES (?, ?, ?, ?)
// //         `,
// //     [first_name, last_name, email, phone_number],
// //     (err, result) => defaultCallback(err, result, res)
// //   );
// // });

// const express = require("express");
// const { event_participantsConnection } = require("../db");
// const { defaultCallback } = require("../helpers/dbHelper");
// const { verifyToken } = require("../helpers/authenticationUtils");

// const router = express.Router();

// router.get("/list", verifyToken, (req, res) => {
//   event_participantsConnection.execute(
//     `
//     SELECT
//       event_participants.id,
//       event_participants.first_name,
//       event_participants.last_name,
//       event_participants.email,
//       event_participants.phone_number,
//       admin_registration.first_name as admin_first_name
//     FROM
//       event_participants
//       INNER JOIN admin_registration ON admin_registration.id = event_participants.admin_id;
//     `,
//     (err, result) => {
//       defaultCallback(err, result, res);
//     }
//   );
// });

// router.get("/list/:email", verifyToken, (req, res) => {
//   const { email } = req.params;

//   event_participantsConnection.execute(
//     "SELECT * FROM event_participants WHERE email=?",
//     [email],
//     (err, result) => {
//       defaultCallback(err, result, res);
//     }
//   );
// });

// router.post("/list", verifyToken, (req, res) => {
//   const { first_name, last_name, email, phone_number } = req.body;

//   event_participantsConnection.execute(
//     "INSERT INTO event_participants (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)",
//     [first_name, last_name, email, phone_number],
//     (err, result) => {
//       defaultCallback(err, result, res);
//     }
//   );
// });

// router.patch("/list/:email", verifyToken, (req, res) => {
//   const { email } = req.params;
//   const { first_name, last_name, phone_number } = req.body;

//   let sqlQuery = "UPDATE event_participants SET ";
//   const valuesArray = [];

//   if (first_name) {
//     sqlQuery += "first_name=?, ";
//     valuesArray.push(first_name);
//   }

//   if (last_name) {
//     sqlQuery += "last_name=?, ";
//     valuesArray.push(last_name);
//   }

//   if (phone_number) {
//     sqlQuery += "phone_number=?, ";
//     valuesArray.push(phone_number);
//   }

//   sqlQuery = sqlQuery.slice(0, -2); // Remove the trailing comma and space
//   sqlQuery += " WHERE email=?";
//   valuesArray.push(email);

//   event_participantsConnection.execute(sqlQuery, valuesArray, (err, result) => {
//     defaultCallback(err, result, res);
//   });
// });

// router.delete("/list/:email", verifyToken, (req, res) => {
//   const { email } = req.params;

//   event_participantsConnection.execute(
//     "DELETE FROM event_participants WHERE email=?",
//     [email],
//     (err, result) => {
//       defaultCallback(err, result, res);
//     }
//   );
// });

// module.exports = router;
