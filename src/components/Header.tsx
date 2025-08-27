import React from 'react';
import { ShoppingCart, Home, Menu, X } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function Header() {
  const { state, dispatch } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleViewChange = (view: 'products' | 'cart') => {
    dispatch({ type: 'SET_VIEW', view });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => handleViewChange('products')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Gabriela <span className="text-green-600">Colchões</span>
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleViewChange('products')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                state.currentView === 'products'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Home size={18} />
              <span>Produtos</span>
            </button>

            <button
              onClick={() => handleViewChange('cart')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                state.currentView === 'cart'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Carrinho</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => handleViewChange('products')}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                state.currentView === 'products'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Home size={18} />
              <span>Produtos</span>
            </button>

            <button
              onClick={() => handleViewChange('cart')}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                state.currentView === 'cart'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Carrinho</span>
              {cartItemsCount > 0 && (
                <span className="ml-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}