// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const registrationRouter = require("./routes/registration");
// const event_participantsRouter = require("./routes/list");

// const app = express();

// const PORT = 5000;

// app.use(cors());
// app.use(express.json());
// app.use(registrationRouter);
// app.use(event_participantsRouter);

// app.listen(PORT, () => {
//   console.log("Server is running on port 5000");
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const registrationRouter = require("./routes/registration");
const registerRouter = require("./routes/register");
const listRouter = require("./routes/list");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(registerRouter);
app.use(listRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
