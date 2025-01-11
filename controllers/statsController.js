const fetchCryptoData = require("../services/fetchCryptoData");

const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin parameter is required" });
  }

  try {
    const cryptoData = await fetchCryptoData(coin);

    return res.json({
      price: cryptoData.price,
      marketCap: cryptoData.marketCap,
      change24h: cryptoData.change24h,
    });
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = { getCryptoStats };
