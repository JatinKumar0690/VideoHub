const cloudinary = require("../config/cloudinary.js");
const Video = require("../models/video.model.js");


const uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and video file are required"
      });
    }

    // Upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({
            success: false,
            message: "Cloudinary upload failed"
          });
        }

        const videoUrl = result.secure_url;

        // 🔥 so_3 thumbnail
        const thumbnailUrl = videoUrl
          .replace("/video/upload/", "/video/upload/so_3/")
          .replace(".mp4", ".jpg");

        // Save in MongoDB
        const video = await Video.create({
          title,
          videoUrl,
          thumbnailUrl
        });

        return res.status(201).json({
          success: true,
          message: "Video uploaded successfully",
          video
        });
      }
    );

    stream.end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// GET /api/videos  (videos dikhane ke liye)
const getVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const videos = await Video.find()
      .sort({ createdAt: -1 }) // latest videos first
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalVideos: total,
      videos
    });
  } catch (error) {
    console.error("GET videos error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos"
    });
  }
};


module.exports = {
  uploadVideo,
  getVideos
};
