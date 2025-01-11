const CryptoData = require("../models/CryptoData");
const { calculateStandardDeviation } = require("../utils/mathUtils");

const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;

  const symbolMap = {
    bitcoin: "BTC",
    ethereum: "ETH",
    "matic-network": "MATIC",
  };

  const coinSymbol = symbolMap[coin?.toLowerCase()];
  if (!coinSymbol) {
    return res.status(400).json({ error: "Invalid coin parameter" });
  }

  try {
    const records = await CryptoData.find({ symbol: coinSymbol })
      .sort({ _id: -1 })
      .limit(100);

    if (records.length < 2) {
      return res
        .status(400)
        .json({ error: "Not enough records to calculate standard deviation" });
    }

    const prices = records.map((record) => record.price);
    const standardDeviation = calculateStandardDeviation(prices);

    return res.json({ deviation: standardDeviation.toFixed(2) });
  } catch (error) {
    console.error("Error calculating deviation:", error.message);
    return res.status(500).json({ error: "Failed to calculate deviation" });
  }
};

module.exports = { getPriceDeviation };
