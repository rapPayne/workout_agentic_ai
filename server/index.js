import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import './config/passport-setup.js';

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Auth Routes
app.use('/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Test GET endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
