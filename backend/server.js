const express = require("express");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_HOST = process.env.REDIS_HOST || "redis";

app.use(cors());
app.use(express.json());

const redisClient = createClient({
  url: `redis://${REDIS_HOST}:6379`
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

async function connectToRedis() {
  while (!redisClient.isOpen) {
    try {
      await redisClient.connect();
      console.log("Connected to Redis");
    } catch (error) {
      console.log("Waiting for Redis...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

app.get("/api/visits", async (req, res) => {
  try {
    const visits = await redisClient.incr("visit_count");

    res.json({
      message: "Visit recorded successfully",
      visits
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to record visit",
      error: error.message
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy" });
});

connectToRedis().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend API running on port ${PORT}`);
  });
});