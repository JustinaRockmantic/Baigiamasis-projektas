// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const { registrationConnection } = require("../db");
// const { defaultCallback } = require("../helpers/dbHelper");
// const { verifyToken } = require("../helpers/authenticationUtils");

// const router = express.Router();

// router.post("/register", (req, res) => {
//   const { body } = req;
//   const { email, first_name, last_name, password } = body;

//   const hashedPassword = bcrypt.hashSync(password, 12);

//   registrationConnection.execute(
//     "INSERT INTO admin_registration (email, first_name, last_name, password) VALUES (?, ?, ?, ?)",
//     [email, first_name, last_name, hashedPassword],
//     (err, result) => defaultCallback(err, result, res)
//   );
// });

// router.post("/login", (req, res) => {
//   const { body } = req;
//   const { email, password } = body;

//   const incorrectCredentialsResponse = () =>
//     res.json({
//       message: "Incorrect email or password",
//     });

//   if (!email || !password) {
//     incorrectCredentialsResponse();
//     return;
//   }

//   registrationConnection.execute(
//     "SELECT * FROM admin_registration WHERE email=?",
//     [email],
//     (err, result) => {
//       if (result.length === 0) {
//         incorrectCredentialsResponse();
//       } else {
//         const user = result[0];
//         const isPasswordCorrect = bcrypt.compareSync(password, user.password);

//         const { id, email } = user;

//         if (isPasswordCorrect) {
//           const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
//           res.json({
//             message: "Successfully logged in!",
//             token,
//           });
//         } else {
//           incorrectCredentialsResponse();
//         }
//       }
//     }
//   );
// });

// router.get("/token/verify", verifyToken, (req, res) => {
//   res.json(res.locals.user);
// });

// module.exports = router;
