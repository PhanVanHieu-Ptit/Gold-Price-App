const fs = require("fs");
const path = require("path");

// Function xử lý chính
const handler = (req, res) => {
  const filePath = path.join(process.cwd(), "./cache/gold.json");

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(503).json({
      error: "No cached data yet. Please wait for cron to update.",
    });
  }
};

// Export cho Vercel
module.exports = handler;

// Nếu chạy trực tiếp bằng Node
if (require.main === module) {
  const express = require("express");
  const cors = require("cors");

  const app = express();
  app.use(cors());

  app.get("/api/gold", (req, res) => handler(req, res));

  const PORT = 3001;
  app.listen(PORT, () =>
    console.log(`🔗 Server chạy local tại http://localhost:${PORT}/api/gold`)
  );
}
