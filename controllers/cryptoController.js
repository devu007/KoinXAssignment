const fetchCryptoData = require("../services/fetchCryptoData");
const CryptoData = require("../models/CryptoData");

const updateCryptoData = async () => {
  console.log("Fetching crypto data from CoinGecko...");

  const cryptoIds = ["bitcoin", "ethereum", "matic-network"];
  const cryptoSymbols = {
    bitcoin: "BTC",
    ethereum: "ETH",
    "matic-network": "MATIC",
  };

  try {
    const cryptoDataArray = await Promise.all(
      cryptoIds.map((id) => fetchCryptoData(id))
    );

    await Promise.all(
      cryptoIds.map((id, index) =>
        CryptoData.create({
          symbol: cryptoSymbols[id],
          price: cryptoDataArray[index].price,
          marketCap: cryptoDataArray[index].marketCap,
          change24h: cryptoDataArray[index].change24h,
        })
      )
    );

    console.log("Crypto data successfully updated.");
  } catch (error) {
    console.error("Error fetching or saving crypto data:", error);
  }
};

module.exports = { updateCryptoData };
