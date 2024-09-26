const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Create Connection with MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    console.log(err);
  } else {
    console.log("Successfully connected to Database: ", db.threadId);
  }
});

// Set up the displays
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Question 1
app.get("/q1", (req, res) => {
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.render("q1", { results: results });
    }
  });
});

// Question 2
app.get("/q2", (req, res) => {
  db.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.render("q2", { results: results });
    }
  });
});

// Question 3
app.get("/q3", (req, res) => {
  db.query("SELECT first_name FROM patients", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.render("q3", { results: results });
    }
  });
});

//   Question 4
app.get("/q4", (req, res) => {
  db.query("SELECT provider_specialty FROM providers", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.render("q4", { results: results });
    }
  });
});

// listen on port
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
