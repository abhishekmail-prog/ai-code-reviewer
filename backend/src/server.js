require("dotenv").config();
const express = require("express");
const cors = require("cors");
const reviewRouter = require("./routes/review");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50kb" }));

app.use("/api/review", reviewRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
