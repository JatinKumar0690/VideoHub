require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("../src/config/cloudinary");
const Video = require("../src/models/video.model");

// connect DB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
};

const uploadFolder = path.join(__dirname, "../uploads");

const bulkUpload = async () => {
  try {
    await connectDB();

    const files = fs.readdirSync(uploadFolder);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.endsWith(".mp4")) continue;

      const filePath = path.join(uploadFolder, file);
      const title = path.parse(file).name;

      console.log(`Uploading ${title} (${i + 1}/${files.length})`);

      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "video"
      });

      const videoUrl = result.secure_url;

      const thumbnailUrl = videoUrl
        .replace("/video/upload/", "/video/upload/so_3/")
        .replace(".mp4", ".jpg");

      await Video.create({
        title,
        videoUrl,
        thumbnailUrl
      });

      console.log(`✔ Saved: ${title}`);

      // 🔥 RATE LIMIT SAFE DELAY
      await new Promise(res => setTimeout(res, 1500));
    }

    console.log("🎉 All videos uploaded successfully");
    process.exit(0);

  } catch (err) {
    console.error("Bulk upload error:", err);
    process.exit(1);
  }
};

bulkUpload();
