// ./index.js

// EXTERNAL PACKAGE IMPORTS

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

// MIDDLEWARES
require("dotenv").config();
connectDB();
app.use(cors());
app.use(express.json({ extended: true }));

// 3. RUTEO
app.use("/api/users", require("./routes/users"));
app.use("/api/locations", require("./routes/locations"));
app.use("/api/items", require("./routes/items"));
app.use("/", require("./routes/index"));

// 4. SERVIDOR
app.listen(process.env.PORT, () =>
  console.log(`Active server on port ${process.env.PORT}`)
);
