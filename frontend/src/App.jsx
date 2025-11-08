import React, { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { checkoutAPI } from './services/api';
import { debounce } from './utils/helpers';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const {
    products,
    loading: productsLoading,
    error: productsError,
    searchProducts,
    refetch: refetchProducts
  } = useProducts();

  const {
    cart,
    loading: cartLoading,
    error: cartError,
    addToCart,
    removeFromCart,
    updateQuantity,
    refreshCart
  } = useCart();

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term) => searchProducts(term), 300),
    []
  );

  const handleAddToCart = async (productId) => {
    const result = await addToCart(productId);
    if (result.success) {
      toast.success('🎉 Product added to cart!', {
        style: {
          background: '#10B981',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#10B981',
        },
      });
    } else {
      toast.error(result.error || 'Failed to add product to cart');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const result = await removeFromCart(productId);
    if (result.success) {
      toast.success('🗑️ Product removed from cart', {
        style: {
          background: '#EF4444',
          color: 'white',
        },
      });
    } else {
      toast.error(result.error || 'Failed to remove product from cart');
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const result = await updateQuantity(productId, quantity);
    if (!result.success) {
      toast.error(result.error || 'Failed to update quantity');
    }
  };

  const handleCheckout = async (customerInfo) => {
    try {
      const response = await checkoutAPI.process(customerInfo);
      setReceipt(response.data);
      setIsCheckoutOpen(false);
      setIsReceiptOpen(true);
      refreshCart();
      toast.success('🎊 Order placed successfully!', {
        style: {
          background: '#10B981',
          color: 'white',
        },
        duration: 4000,
      });
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('❌ Checkout failed. Please try again.');
    }
  };

  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937',
            color: '#fff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={debouncedSearch}
      />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        <div className="mb-12 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Discover Amazing Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Shop the latest trends and find exactly what you're looking for. 
              <span className="block mt-2 text-purple-500 font-medium">Quality products with lightning-fast delivery 🚀</span>
            </p>
          </div>
        </div>

        {/* Error Messages */}
        {productsError && (
          <div className="animate-fade-in">
            <ErrorMessage 
              message={productsError}
              onRetry={refetchProducts}
            />
          </div>
        )}

        {cartError && (
          <div className="animate-fade-in">
            <ErrorMessage 
              message={cartError}
              onRetry={refreshCart}
            />
          </div>
        )}

        {/* Products Grid */}
        {productsLoading ? (
          <LoadingSpinner 
            size="large" 
            text="Loading amazing products..." 
          />
        ) : (
          <div className="animate-fade-in-up animation-delay-300">
            <ProductGrid 
              products={products}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          if (cart?.items?.length > 0) {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          } else {
            toast.error('🛒 Your cart is empty', {
              style: {
                background: '#F59E0B',
                color: 'white',
              },
            });
          }
        }}
      />

      {/* Checkout Form */}
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
        cart={cart}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        receipt={receipt}
      />

      {/* Global Loading Overlay */}
      {(cartLoading || productsLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 flex items-center gap-4 min-w-[220px] shadow-2xl border border-white/20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-gray-700 font-medium">Processing...</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;