require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Vibe Commerce API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Vibe Commerce API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      checkout: '/api/checkout',
      orders: '/api/orders'
    },
    documentation: 'Add /api/health for health check'
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler for API routes - FIXED: Remove the problematic wildcard
app.use('/api', (req, res, next) => {
  // Check if this is an API route that hasn't been handled
  if (req.path.startsWith('/api/') || req.path === '/api') {
    return res.status(404).json({ 
      message: 'API endpoint not found',
      path: req.originalUrl 
    });
  }
  next();
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // For production, handle SPA routing - FIXED: Use proper wildcard handling
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  // Development 404 handler for non-API routes
  app.use((req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.status(404).json({ 
        message: 'Route not found. In development, frontend runs on port 3000.',
        frontend: 'http://localhost:3000'
      });
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`❤️  Health check at http://localhost:${PORT}/api/health`);
  console.log(`🛒 Orders API at http://localhost:${PORT}/api/orders`);
});