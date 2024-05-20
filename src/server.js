require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("All good!");
});

app.get("/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM stories");
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return []; // not a big deal if count not fetched successfully, just don't display
  }
});

app.get("/stories", async (req, res) => {
  offset = req.query.offset || 0;

  try {
    const result = await pool.query(
      `SELECT * FROM stories ORDER BY created_at DESC LIMIT 12 OFFSET ${offset}`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const { author, artist, song, memory } = req.body;
    pool.query("INSERT INTO stories VALUES ($1, $2, $3, $4, now())", [
      author,
      artist,
      song,
      memory,
    ]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

(async () => {
  await pool.connect();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
