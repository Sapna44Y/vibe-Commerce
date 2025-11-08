import React from 'react';
import { X, ShoppingBag, Rocket, Sparkles } from 'lucide-react';
import CartItem from './CartItem';

const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-md shadow-2xl border-l border-white/20 transform transition-transform duration-500 ease-out cart-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative p-3 border-b border-gray-200/50 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <ShoppingBag className="text-white" size={28} />
                  {cart && cart.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                  <p className="text-purple-100 text-sm">Review your items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 text-white hover:scale-110 active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-2 right-20 opacity-20">
              <Sparkles className="text-white" size={20} />
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!cart || cart.items.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4 animate-bounce">🛒</div>
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some amazing products to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.items.map((item) => (
                <CartItem
                  key={item.productId._id || item.productId}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {cart && cart.items.length > 0 && (
            <div className="border-t border-gray-200/50 p-2 space-y-2 bg-white/50 backdrop-blur-sm">
              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-700">Total:</span>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ${cart.total?.toFixed(2)}
                </span>
              </div>

             

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-3 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-green-500/20 flex items-center justify-center gap-3 group"
              >
                <Rocket size={20} className="group-hover:animate-bounce" />
                Proceed to Checkout
                <Rocket size={20} className="group-hover:animate-bounce" />
              </button>

              {/* Continue shopping */}
              <button
                onClick={onClose}
                className="w-full bg-transparent hover:bg-gray-200 text-gray-600 py-2 px-3 rounded-xl font-medium transition-all duration-300 border border-gray-600/50 hover:border-gray-400"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;