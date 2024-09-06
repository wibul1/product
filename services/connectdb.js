import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
