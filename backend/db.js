const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Load environment variables

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // get from .env file
    if (!mongoURI) {
      throw new Error('MONGO_URI is missing in .env file');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
