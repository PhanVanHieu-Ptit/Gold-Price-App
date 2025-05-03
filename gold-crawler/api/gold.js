const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

app.get("/api/gold", (req, res) => {
  const filePath = path.join(__dirname, "cache/gold.json");

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } else {
    res
      .status(503)
      .json({ error: "No cached data yet. Please wait for cron to update." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🔗 API server running at http://localhost:${PORT}`)
);
