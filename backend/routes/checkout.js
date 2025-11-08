const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/checkout - Process checkout and create order
router.post('/', async (req, res) => {
  try {
    const { customerInfo } = req.body;
    
    // Validate customer info
    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return res.status(400).json({ 
        message: 'Customer information (name and email) is required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    let cart = await Cart.findOne({ userId: 'default-user' })
      .populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate stock availability
    for (let item of cart.items) {
      const product = await Product.findById(item.productId._id);
      if (!product || !product.inStock) {
        return res.status(400).json({ 
          message: `Product "${item.productId.name}" is out of stock` 
        });
      }
    }

    // Create order with additional details
    const order = new Order({
      customerInfo: {
        name: customerInfo.name.trim(),
        email: customerInfo.email.toLowerCase(),
        phone: customerInfo.phone || '',
        address: customerInfo.address || {}
      },
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
        name: item.productId.name,
        image: item.productId.image
      })),
      total: cart.total,
      orderDate: new Date(),
      status: 'completed', // Since it's mock checkout
      shippingAddress: customerInfo.shippingAddress || {},
      notes: customerInfo.notes || ''
    });

    await order.save();

    // Clear the cart after successful order
    cart.items = [];
    cart.total = 0;
    await cart.save();

    // Populate the order for the receipt
    await order.populate('items.productId');

    // Generate comprehensive receipt
    const receipt = {
      orderId: order._id,
      orderNumber: `VC-${order._id.toString().slice(-6).toUpperCase()}`,
      customerInfo: order.customerInfo,
      items: order.items,
      total: order.total,
      subtotal: order.total, // In real app, you might have taxes/shipping
      orderDate: order.orderDate,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      status: order.status,
      shippingAddress: order.shippingAddress,
      timestamp: new Date().toISOString()
    };

    console.log(`✅ New order created: ${receipt.orderNumber} for ${customerInfo.email}`);

    res.status(201).json(receipt);
  } catch (error) {
    console.error('Checkout error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: messages 
      });
    }

    res.status(500).json({ 
      message: 'Checkout failed. Please try again.', 
      error: error.message 
    });
  }
});

// GET /api/checkout/success/:orderId - Get order success details
router.get('/success/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const receipt = {
      orderId: order._id,
      orderNumber: `VC-${order._id.toString().slice(-6).toUpperCase()}`,
      customerInfo: order.customerInfo,
      items: order.items,
      total: order.total,
      orderDate: order.orderDate,
      status: order.status,
      estimatedDelivery: new Date(order.orderDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    };

    res.json(receipt);
  } catch (error) {
    console.error('Error fetching order success:', error);
    res.status(500).json({ 
      message: 'Error fetching order details', 
      error: error.message 
    });
  }
});

module.exports = router;