const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Placeholder for future routes
app.get('/', (req, res) => {
  res.send('Library Management System API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Use the book routes
app.use('/api', bookRoutes);