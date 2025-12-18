const mongoose = require('mongoose');

const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log("Error in MongoDb")
    }
};

module.exports = connectedDB;