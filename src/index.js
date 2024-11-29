import dotenv from 'dotenv';
dotenv.config(); // Manually load .env file

import express from 'express';
import connectDB from './db/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Node API server updated');
});

// Connect to MongoDB
connectDB().then(() => {
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
});
 

export default app;
