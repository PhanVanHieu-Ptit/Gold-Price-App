const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function fetchGoldPrices() {
  try {
    const result = await fetchData();
    // Ghi ra file cache
    fs.writeFileSync(
      path.join(__dirname, "../cache/gold.json"),
      JSON.stringify(result, null, 2)
    );
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Gold data updated.`);
  } catch (err) {
    console.error("❌ Crawl error:", err.message);
  } finally {
    await browser.close();
  }
}

module.exports = fetchGoldPrices;
