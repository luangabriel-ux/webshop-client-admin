import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  colors: string[];
}

interface AdminContextType {
  isAuthenticated: boolean;
  currentView: 'dashboard' | 'products' | 'stock';
  products: Product[];
  password: string;
  showPasswordModal: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setCurrentView: (view: 'dashboard' | 'products' | 'stock') => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, stock: number) => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
  setShowPasswordModal: (show: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'stock'>('dashboard');
  const [password, setPassword] = useState('admin123');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Colchão Ortopédico Premium',
      description: 'Colchão ortopédico de alta qualidade com espuma viscoelástica e molas ensacadas.',
      price: 899.99,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      stock: 15,
      colors: ['Branco', 'Bege']
    },
    {
      id: '2',
      name: 'Colchão Casal Confort',
      description: 'Colchão de casal com tecnologia de espuma de alta densidade.',
      price: 649.99,
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      stock: 8,
      colors: ['Branco', 'Azul']
    }
  ]);

  const login = (username: string, inputPassword: string): boolean => {
    if (username === 'admin' && inputPassword === password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateStock = (id: string, stock: number) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, stock } : product
    ));
  };

  const changePassword = (currentPassword: string, newPassword: string): boolean => {
    if (currentPassword === password) {
      setPassword(newPassword);
      setIsAuthenticated(false); // Force re-login with new password
      return true;
    }
    return false;
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      currentView,
      products,
      password,
      showPasswordModal,
      login,
      logout,
      setCurrentView,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStock,
      changePassword,
      setShowPasswordModal
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
}