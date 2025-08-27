import React from 'react';
import { AdminProvider } from './contexts/AdminContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ProductsView from './components/ProductsView';
import StockView from './components/StockView';
import PasswordModal from './components/PasswordModal';
import { useAdminContext } from './contexts/AdminContext';

function AppContent() {
  const { 
    isAuthenticated, 
    currentView, 
    showPasswordModal 
  } = useAdminContext();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'products' && <ProductsView />}
        {currentView === 'stock' && <StockView />}
      </main>
      {showPasswordModal && <PasswordModal />}
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}

export default App;