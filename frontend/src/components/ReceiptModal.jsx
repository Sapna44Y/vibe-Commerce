import React from 'react';
import { X, CheckCircle, PartyPopper, Truck, Shield } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/30 animate-modal-pop">
          {/* Header */}
          <div className="relative p-8 border-b border-gray-200/50 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full p-3 shadow-2xl border border-green-200">
                <PartyPopper className="text-green-600" size={32} />
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <CheckCircle className="text-white" size={32} />
                <h2 className="text-3xl font-bold text-white">Order Confirmed!</h2>
              </div>
              <p className="text-green-100 text-lg">Thank you for your purchase! 🎉</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Order Number */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-2">Order Reference</p>
              <p className="text-xl font-mono font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {receipt.orderNumber || `VC-${receipt.orderId?.slice(-8).toUpperCase()}`}
              </p>
            </div>

            {/* Customer Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800">
                <Shield className="text-blue-500" size={20} />
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Name:</span>
                    <span className="font-semibold text-gray-800">{receipt.customerInfo.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="font-semibold text-blue-600">{receipt.customerInfo.email}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Order Date:</span>
                    <span className="font-semibold text-gray-800">
                      {new Date(receipt.orderDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className="font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
                      {receipt.status || 'Completed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800">
                <Truck className="text-purple-500" size={20} />
                Order Details
              </h3>
              <div className="space-y-4 mb-6">
                {receipt.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50 hover:border-purple-200 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🛍️</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-lg text-gray-800">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-700">Total Amount:</span>
                  <span className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${receipt.total?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="text-blue-600" size={24} />
                <h4 className="font-semibold text-blue-800">Delivery Information</h4>
              </div>
              <p className="text-blue-700 text-sm">
                Your order will be delivered within 3-5 business days. 
                You'll receive a tracking number via email once your order ships.
              </p>
            </div>

            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 text-center">
              <p className="text-green-800 font-medium">
                🎊 Your order has been successfully processed! A confirmation email has been sent to{" "}
                <span className="font-bold">{receipt.customerInfo.email}</span>.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-purple-500/20"
            >
              Continue Shopping 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;