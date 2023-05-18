require("dotenv").config();
const express = require("express");
const cors = require("cors");

const registrationRouter = require("./routes/registration");
// const event_participantsRouter = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());
app.use(registrationRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
