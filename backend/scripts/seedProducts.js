require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

connectDB();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Smart Watch Series 5",
    price: 199.99,
    description: "Advanced smartwatch with health monitoring features",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable and sustainable cotton t-shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Clothing",
    inStock: true
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Keep your drinks hot or cold for hours",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "Accessories",
    inStock: true
  },
  {
    name: "Programming Book Bundle",
    price: 49.99,
    description: "Set of 3 programming books for web development",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    category: "Books",
    inStock: true
  },
  {
    name: "Gaming Mouse",
    price: 59.99,
    description: "Precision gaming mouse with RGB lighting",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Yoga Mat",
    price: 34.99,
    description: "Non-slip yoga mat for all types of exercises",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    category: "Fitness",
    inStock: true
  },
  {
    name: "Ceramic Coffee Mug",
    price: 14.99,
    description: "Beautiful handcrafted ceramic mug",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    category: "Home",
    inStock: true
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();