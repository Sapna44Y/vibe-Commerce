import React from 'react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      onRemove(item.productId._id || item.productId);
    } else {
      onUpdateQuantity(item.productId._id || item.productId, newQuantity);
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-purple-200/50 transition-all duration-300 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative">
        <img
          src={item.productId.image}
          alt={item.productId.name}
          className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
        />
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
          {item.quantity}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 truncate group-hover:text-purple-700 transition-colors duration-300">
          {item.productId.name}
        </h4>
        <p className="text-green-600 font-bold text-lg mt-1">
          ${item.price}
        </p>
        <p className="text-xs text-gray-500 mt-1">Each</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-gray-50/50 rounded-xl p-1 border border-gray-200/50">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-2 rounded-lg hover:bg-red-100 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center font-bold text-gray-700 text-sm">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-2 rounded-lg hover:bg-green-100 text-green-500 hover:text-green-700 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Price and Actions */}
      <div className="text-right">
        <p className="font-bold text-gray-800 text-lg mb-2">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-pink-500 transition-all duration-200 hover:scale-110 active:scale-95">
            <Heart size={16} />
          </button>
          <button
            onClick={() => onRemove(item.productId._id || item.productId)}
            className="p-2 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;