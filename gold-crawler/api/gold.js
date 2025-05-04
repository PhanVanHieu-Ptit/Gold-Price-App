const fs = require("fs");
const path = require("path");
const fetchData = require("../crawler/fetchData");

// Function xử lý chính
const handler = (req, res) => {
  const filePath = path.join(process.cwd(), "../cache/gold.json");

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(503).json({
      error: "No cached data yet. Please wait for cron to update.",
    });
  }
};

const getDataHandler = async (req, res) => {
  try {
    const result = await fetchData();
    console.log("result: ", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(503).json({
      error: error,
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

  // app.get("/api/gold/v2", (req, res) => getDataHandler(req, res));
  app.get("/api/gold", (req, res) => handler(req, res));

  const PORT = 3001;
  app.listen(PORT, () =>
    console.log(`🔗 Server chạy local tại http://localhost:${PORT}/api/gold`)
  );
}
