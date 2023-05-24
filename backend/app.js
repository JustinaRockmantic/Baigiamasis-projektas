require("dotenv").config();
const express = require("express");
const cors = require("cors");

const registerRouter = require("./routes/register");
const listRouter = require("./routes/list");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(registerRouter);
app.use(listRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
