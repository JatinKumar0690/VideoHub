const express = require("express");
const cors = require("cors")
const videoRoutes = require("./routes/video.route.js");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
