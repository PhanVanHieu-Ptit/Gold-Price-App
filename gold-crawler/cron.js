const cron = require("node-cron");
const fetchGoldPrices = require("./crawler/fetchGold");

// Chạy mỗi 15 phút
cron.schedule("*/15 * * * *", async () => {
  await fetchGoldPrices();
});

// Chạy lần đầu khi start
fetchGoldPrices();
