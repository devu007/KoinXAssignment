const axios = require("axios");

async function fetchCryptoData(id) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const { symbol } = response.data; // Extract the symbol
    const { current_price, market_cap, price_change_24h_in_currency } =
      response.data.market_data;

    return {
      symbol: symbol.toUpperCase(), // Ensure the symbol is uppercase (e.g., BTC, ETH)
      price: current_price.usd,
      marketCap: market_cap.usd,
      change24h: price_change_24h_in_currency.usd,
    };
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error.message);
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}

module.exports = fetchCryptoData;
