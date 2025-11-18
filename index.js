const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Password validation endpoint
app.post('/api/validate-password', (req, res) => {
  const { password } = req.body;
  
  console.log('=== Password Validation Request ===');
  console.log('Received password:', password);
  console.log('Received password length:', password ? password.length : 0);
  console.log('Received password (escaped):', JSON.stringify(password));
  
  if (!password) {
    console.log('ERROR: No password provided');
    return res.status(400).json({ 
      success: false, 
      message: 'Password is required' 
    });
  }
  
  const correctPassword = process.env.ACCESS_PASSWORD;
  console.log('Expected password:', correctPassword);
  console.log('Expected password length:', correctPassword ? correctPassword.length : 0);
  console.log('Expected password (escaped):', JSON.stringify(correctPassword));
  console.log('Passwords match:', password === correctPassword);
  console.log('===================================');
  
  if (password === correctPassword) {
    console.log('SUCCESS: Access granted');
    return res.status(200).json({ 
      success: true, 
      message: 'Access granted' 
    });
  } else {
    console.log('FAILED: Incorrect password');
    return res.status(401).json({ 
      success: false, 
      message: 'Incorrect password' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

