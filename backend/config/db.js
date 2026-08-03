const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_url, { 
      serverSelectionTimeoutMS: 5000,
      family: 4 // Force IPv4 to prevent intermittent DNS timeouts on Windows
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
