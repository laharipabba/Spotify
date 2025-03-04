const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files

// Endpoint to get song data
app.get("/songs", (req, res) => {
  fs.readFile("songs.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading songs data" });
    res.json(JSON.parse(data));
  });
});

// Serve song files dynamically
app.get("/audio/:filename", (req, res) => {
  const filePath = path.join(__dirname, "public/audio", req.params.filename);
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
