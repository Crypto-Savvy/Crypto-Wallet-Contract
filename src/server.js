// const dotenv = require("dotenv").config();
const express = require("express");
// const dbConfig = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */
const router = require("./router");

/* Middlewares */
app.use(router);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

module.exports = app;
