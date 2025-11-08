import React, { useState } from 'react';
import { ShoppingCart, Star, Zap, Heart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    try {
      await onAddToCart(product._id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-purple-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {product.price > 100 && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            <Zap size={12} />
            <span>Premium</span>
          </div>
        </div>
      )}

      {/* Wishlist button */}
      <button className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
        <Heart size={16} />
      </button>

      {/* Image container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-48 object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=300&fit=crop';
          }}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-48"></div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        <div className="mb-3">
          <span className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-200">
            {product.category}
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price and rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.price < 50 && (
              <span className="text-xs text-green-600 font-medium mt-1">Great Value!</span>
            )}
          </div>

          {/* Stock status */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            product.inStock 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {product.inStock ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                In Stock
              </>
            ) : (
              'Out of Stock'
            )}
          </div>
        </div>

        {/* ALWAYS VISIBLE Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            product.inStock
              ? isAdding
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>

        {/* Quick stats */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <span className="text-xs text-gray-500 ml-1">(24)</span>
          </div>
          <span className="text-xs text-gray-500">Free Shipping</span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
    </div>
  );
};

export default ProductCard;