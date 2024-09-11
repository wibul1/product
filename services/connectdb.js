import dotenv from 'dotenv';
dotenv.config();  // โหลด environment variables จาก .env
import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

// console.log(MONGO_URI);
export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true, 
      // useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
