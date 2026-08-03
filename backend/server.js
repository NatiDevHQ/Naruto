const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
