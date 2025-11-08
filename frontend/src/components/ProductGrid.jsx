import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ProductGrid = ({ products, onAddToCart, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="animate-fade-in">
        <LoadingSpinner size="large" text="Loading amazing products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <ErrorMessage 
          message={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">📦</div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search terms or browse different categories.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in-up">
      {products.map((product, index) => (
        <div 
          key={product._id} 
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;