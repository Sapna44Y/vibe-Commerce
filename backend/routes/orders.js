const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders - Get all orders (with pagination and filtering)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      email, 
      status,
      startDate,
      endDate 
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (email) {
      filter['customerInfo.email'] = new RegExp(email, 'i');
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (startDate || endDate) {
      filter.orderDate = {};
      if (startDate) {
        filter.orderDate.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.orderDate.$lte = new Date(endDate);
      }
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { orderDate: -1 }, // Latest first
      populate: 'items.productId'
    };

    const orders = await Order.find(filter)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort)
      .populate('items.productId');

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      totalOrders: total
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
});

// GET /api/orders/:id - Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      message: 'Error fetching order', 
      error: error.message 
    });
  }
});

// GET /api/orders/email/:email - Get orders by customer email
router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { orderDate: -1 }
    };

    const orders = await Order.find({ 
      'customerInfo.email': new RegExp(email, 'i') 
    })
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort)
      .populate('items.productId');

    const total = await Order.countDocuments({ 
      'customerInfo.email': new RegExp(email, 'i') 
    });

    res.json({
      orders,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      totalOrders: total
    });
  } catch (error) {
    console.error('Error fetching orders by email:', error);
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
});

// PUT /api/orders/:id/status - Update order status
// router.put('/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'completed'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ 
//         message: 'Invalid status', 
//         validStatuses 
//       });
//     }

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status,
//         ...(status === 'shipped' && { shippedDate: new Date() }),
//         ...(status === 'delivered' && { deliveredDate: new Date() })
//       },
//       { new: true }
//     ).populate('items.productId');

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json({
//       message: 'Order status updated successfully',
//       order
//     });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ 
//       message: 'Error updating order status', 
//       error: error.message 
//     });
//   }
// });

router.put('/:id/status', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this for debugging
    
    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({ 
        message: 'Request body is missing or invalid',
        details: 'Make sure to send JSON with Content-Type: application/json'
      });
    }

    const { status } = req.body;
    
    // Check if status is provided
    if (!status) {
      return res.status(400).json({ 
        message: 'Status is required in request body',
        example: { "status": "shipped" }
      });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status', 
        validStatuses,
        received: status
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(status === 'shipped' && { shippedDate: new Date() }),
        ...(status === 'delivered' && { deliveredDate: new Date() })
      },
      { new: true }
    ).populate('items.productId');

    if (!order) {
      return res.status(404).json({ 
        message: 'Order not found',
        orderId: req.params.id
      });
    }

    res.json({
      message: 'Order status updated successfully',
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        customerInfo: order.customerInfo,
        total: order.total,
        orderDate: order.orderDate
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid order ID format',
        error: 'Please provide a valid MongoDB ObjectId'
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating order status', 
      error: error.message 
    });
  }
});


// DELETE /api/orders/:id - Delete an order (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ 
      message: 'Order deleted successfully',
      deletedOrder: order 
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ 
      message: 'Error deleting order', 
      error: error.message 
    });
  }
});

// GET /api/orders/stats/summary - Get order statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentOrders = await Order.find()
      .sort({ orderDate: -1 })
      .limit(5)
      .populate('items.productId');

    const revenueByMonth = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            month: { $month: '$orderDate' }
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);

    res.json({
      summary: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        ordersByStatus: ordersByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        averageOrderValue: totalRevenue[0]?.total / totalOrders || 0
      },
      recentOrders,
      revenueByMonth
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({ 
      message: 'Error fetching order statistics', 
      error: error.message 
    });
  }
});

module.exports = router;