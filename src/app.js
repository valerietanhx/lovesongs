require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Story = require("../models/story");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("All good!");
});

app.get("/stories", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stories.");
  }
});

app.post("/submit", async (req, res) => {
  try {
    await Story.create(req.body);
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
