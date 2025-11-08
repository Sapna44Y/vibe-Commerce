

import { useState, useEffect } from 'react';
import { cartAPI } from '../services/api';

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      console.log('Fetching cart...');
      const response = await cartAPI.get();
      console.log('Cart API response:', response.data);
      setCart(response.data);
      setError(null);
    } catch (err) {
      const errorMsg = 'Failed to fetch cart';
      setError(errorMsg);
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      console.log('Adding to cart:', productId, quantity);
      const response = await cartAPI.addItem(productId, quantity);
      console.log('Add to cart response:', response.data);
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add item to cart';
      setError(errorMsg);
      console.error('Add to cart error:', err.response?.data || err.message);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      console.log('Removing from cart:', productId);
      const response = await cartAPI.removeItem(productId);
      console.log('Remove from cart response:', response.data);
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to remove item from cart';
      setError(errorMsg);
      console.error('Remove from cart error:', err.response?.data || err.message);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      console.log('Updating quantity:', productId, quantity);
      const response = await cartAPI.updateQuantity(productId, quantity);
      console.log('Update quantity response:', response.data);
      setCart(response.data);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update quantity';
      setError(errorMsg);
      console.error('Update quantity error:', err.response?.data || err.message);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (cart && cart.items.length > 0) {
      for (const item of cart.items) {
        await removeFromCart(item.productId._id || item.productId);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart: fetchCart
  };
};