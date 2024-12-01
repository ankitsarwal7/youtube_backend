  
import { app } from './app.js'; // Importing the app from app.js
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8000;

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`MONGO db connection failed !!!`, error);
    process.exit(1); // Exit the app if the connection fails
  }
};

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
