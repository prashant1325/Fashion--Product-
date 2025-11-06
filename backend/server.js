const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // ✅ Load .env file
const connectDB = require("./db");

// ✅ Route imports
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");
const featuredRoutes = require("./routes/featuredProducts");
const sellRoutes = require("./routes/sell");
const tradeRoutes = require("./routes/trade");
const authRoutes = require("./routes/auth");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // support large JSON/base64 images
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// ✅ API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/featured", featuredRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/trades", tradeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🛍️ UpStyle API running successfully 🚀");
});

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Server error", message: err.message });
});

// ✅ Export app for Vercel deployment
module.exports = app;

// ✅ Run locally only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
