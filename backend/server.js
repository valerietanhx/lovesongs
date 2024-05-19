require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.POSTGRESQL_PORT,
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("All good!");
});

app.get("/stories", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM stories ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stories.");
  }
});

app.post("/submit", async (req, res) => {
  try {
    const { author, artist, song, memory } = req.body;
    const result = await pool.query(
      "INSERT INTO stories VALUES ($1, $2, $3, $4, now())",
      [author, artist, song, memory]
    );
    return res.redirect("http://localhost:5500/public/submitted.html");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
    // TODO: update
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
