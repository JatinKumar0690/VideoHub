const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");

const {
  uploadVideo,
  getVideos
} = require("../controllers/video.controllers");

// POST upload
router.post("/", upload.fields([{ name: "video", maxCount: 1 }]), uploadVideo);

// GET videos 👇 YEH LINE ADD KARO
router.get("/", getVideos);

module.exports = router;