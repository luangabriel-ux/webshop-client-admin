import React from 'react';
import { StoreProvider, useStore } from './contexts/StoreContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function AppContent() {
  const { state } = useStore();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'cart':
        return <Cart />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {renderCurrentView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GC</span>
                </div>
                <h3 className="text-xl font-bold">
                  Gabriela <span className="text-green-400">Colchões</span>
                </h3>
              </div>
              <p className="text-gray-400">
                Móveis de qualidade para transformar sua casa em um lar ainda mais aconchegante.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p>📱 (62) 99329-4939</p>
                <p>🕒 Seg - Sex: 8h às 18h</p>
                <p>🕒 Sáb: 8h às 14h</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Informações</h4>
              <div className="space-y-2 text-gray-400">
                <p>✅ Entrega gratuita na região</p>
                <p>🔧 Montagem inclusa</p>
                <p>🛡️ Garantia de qualidade</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Gabriela Colchões. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;