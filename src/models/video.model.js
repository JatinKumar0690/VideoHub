const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        thumbnailUrl : {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("video", videoSchema);