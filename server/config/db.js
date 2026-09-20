const mongoose = require('mongoose');

// In-memory store for fallback when MongoDB is unavailable
let useInMemory = false;
const inMemoryStore = {};

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/beneficiary360';
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ MongoDB connected:', mongoURI);
    useInMemory = false;
    return true;
  } catch (err) {
    console.warn('⚠️  MongoDB not available. Using in-memory data store.');
    useInMemory = true;
    return false;
  }
};

const isUsingInMemory = () => useInMemory;
const getStore = () => inMemoryStore;

module.exports = { connectDB, isUsingInMemory, getStore };
