const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function fetchData() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.giavang.net", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#tbl");

    const data = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("#tbl tbody tr[data-code]")
      );
      return rows.map((row) => {
        const name = row.querySelector("td")?.innerText.trim();
        const buy = row
          .querySelector('td[data-field="buy"] span#text')
          ?.innerText.trim();
        const sell = row
          .querySelector('td[data-field="sell"] span#text')
          ?.innerText.trim();
        return { name, buy, sell };
      });
    });

    const result = {
      updatedAt: new Date().toISOString(),
      prices: data,
    };

    return result;
  } catch (err) {
    console.error("❌ Crawl error:", err.message);
  } finally {
    await browser.close();
  }
}

module.exports = fetchData;
