require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (fallback to in-memory store if MongoDB not available)
let orders = []; // Simple in-memory store for demo

// Mock MongoDB methods for demo purposes
const mockMongo = {
  save: async (order) => {
    orders.push(order);
    return order;
  },
  find: async () => orders
};

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', require('./routes/orderRoutes'));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));