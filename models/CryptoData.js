const mongoose = require("mongoose");

const CryptoDataSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
});

module.exports = mongoose.model("CryptoData", CryptoDataSchema);
