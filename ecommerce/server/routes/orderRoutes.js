const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, cartItems } = req.body;
    const user = req.user;

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = {
      _id: Math.random().toString(36).substring(2, 9),
      user: user.id,
      products: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      total,
      shippingAddress,
      paymentMethod,
      createdAt: new Date()
    };

    await mockMongo.save(order);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;