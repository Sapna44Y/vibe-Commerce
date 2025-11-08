const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'United States'
      }
    }
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  subtotal: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Number,
    default: 0
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'completed'],
      message: 'Status must be one of: pending, processing, shipped, delivered, cancelled, completed'
    },
    default: 'completed'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'United States'
    }
  },
  paymentMethod: {
    type: String,
    default: 'mock_payment'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'paid'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  shippedDate: Date,
  deliveredDate: Date
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = `VC-${this._id.toString().slice(-6).toUpperCase()}`;
  }
  next();
});

// Virtual for formatted order date
orderSchema.virtual('formattedOrderDate').get(function() {
  return this.orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for estimated delivery date (7 days from order)
orderSchema.virtual('estimatedDeliveryDate').get(function() {
  const deliveryDate = new Date(this.orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  return deliveryDate;
});

// Instance method to get order summary
orderSchema.methods.getSummary = function() {
  return {
    orderNumber: this.orderNumber,
    total: this.total,
    status: this.status,
    itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0),
    orderDate: this.orderDate
  };
};

// Static method to get orders by status
orderSchema.statics.getOrdersByStatus = function(status) {
  return this.find({ status }).populate('items.productId');
};

// Static method to get total revenue
orderSchema.statics.getTotalRevenue = function() {
  return this.aggregate([
    { $match: { status: { $in: ['completed', 'delivered'] } } },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);
};

module.exports = mongoose.model('Order', orderSchema);