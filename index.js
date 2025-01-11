const express = require("express");
const nodeCron = require("node-cron");
const connectDB = require("./config/db");
const { updateCryptoData } = require("./controllers/cryptoController");
const statsRoutes = require("./routes/statsRoutes");
const deviationRoutes = require("./routes/deviationRoutes");

const app = express();

// Connect to the database
connectDB();

// Set up cron job
nodeCron.schedule("0 */2 * * *", updateCryptoData);

// Use routes
app.use("/api", statsRoutes);
app.use("/api", deviationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
