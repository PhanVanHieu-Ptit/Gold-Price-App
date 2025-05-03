const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const filePath = path.join(process.cwd(), "cache/gold.json");

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(503).json({
      error: "No cached data yet. Please wait for cron to update.",
    });
  }
};
