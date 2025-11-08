import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({ ...filters, ...params });
      setProducts(response.data.products || response.data);
      setFilteredProducts(response.data.products || response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Products fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await productsAPI.create(productData);
      await fetchProducts(); // Refresh the list
      setError(null);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create product';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const response = await productsAPI.update(id, productData);
      await fetchProducts(); // Refresh the list
      setError(null);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update product';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await productsAPI.delete(id);
      await fetchProducts(); // Refresh the list
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete product';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  return {
    products: filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    filters,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    updateFilters,
    refetch: fetchProducts
  };
};