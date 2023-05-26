const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POSTMAN senas Martyno token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwibmFtZSI6InBldHJhczEyMyIsImlhdCI6MTY3Mzg5MDQzOH0.N-IeLGqCzT3NAbSFhku80NWwY60h1ABSINWF5c5HGiE

const { dbConnection } = require("../db");
const { defaultCallback } = require("../helpers/dbHelper");
const { verifyToken } = require("../helpers/authenticationUtils");

const router = express.Router();

router.post("/register", (req, res) => {
  const { body } = req;
  const { name, surname, email, password } = body;

  dbConnection.execute(
    "SELECT * FROM register WHERE email=?",
    [email],
    (err, result) => {
      if (err) {
        return defaultCallback(err, null, res);
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Tokia paskyra jau egzistuoja. Prašome prisijungti.",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 12);

      dbConnection.execute(
        "INSERT INTO register (name, surname, email, password) VALUES (?, ?, ?, ?)",
        [name, surname, email, hashedPassword],
        (err, result) => defaultCallback(err, result, res)
      );
    }
  );
});

router.post("/login", (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const incorrectCredentialsResponse = () =>
    res.json({
      message: "Neteisingas el.paštas arba slaptažodis",
    });

  if (!email || !password) {
    incorrectCredentialsResponse();
    return;
  }

  dbConnection.execute(
    "SELECT * FROM register WHERE email=?",
    [email],
    (err, result) => {
      if (result.length === 0) {
        incorrectCredentialsResponse();
      } else {
        const user = result[0];
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        const { id, email } = user;

        if (isPasswordCorrect) {
          const token = jwt.sign({ id, email }, process.env.JWT_SECRET);
          res.json({
            message: "Successfully logged in!",
            token,
          });
        } else {
          incorrectCredentialsResponse();
        }
      }
    }
  );
});

router.get("/token/verify", verifyToken, (req, res) => {
  res.json(res.locals.user);
});

module.exports = router;
