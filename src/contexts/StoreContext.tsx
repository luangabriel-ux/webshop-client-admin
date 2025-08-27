import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  colors: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  currentView: 'products' | 'cart';
}

type StoreAction =
  | { type: 'ADD_TO_CART'; product: Product; selectedColor: string }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_CART_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_VIEW'; view: 'products' | 'cart' };

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Sofá 2 Lugares Elegance',
    description: 'Sofá confortável para 2 pessoas, ideal para salas pequenas. Revestimento em tecido de alta qualidade.',
    price: 899.90,
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 15,
    colors: ['Branco', 'Bege', 'Cinza']
  },
  {
    id: '2',
    name: 'Sofá 3 Lugares Comfort',
    description: 'Sofá espaçoso e confortável para 3 pessoas, revestido em tecido de alta durabilidade. Perfeito para a sala de estar.',
    price: 1299.90,
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 8,
    colors: ['Azul', 'Cinza', 'Marrom', 'Preto']
  },
  {
    id: '3',
    name: 'Mesa de Jantar Moderna',
    description: 'Mesa de jantar para 6 pessoas em madeira maciça com acabamento refinado. Design moderno e elegante.',
    price: 1899.90,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 5,
    colors: ['Mogno', 'Carvalho', 'Nogueira']
  },
  {
    id: '4',
    name: 'Guarda-Roupa 6 Portas',
    description: 'Guarda-roupa espaçoso com 6 portas e compartimentos internos organizados. Ideal para quartos de casal.',
    price: 2299.90,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 3,
    colors: ['Branco', 'Preto', 'Amadeirado']
  },
  {
    id: '5',
    name: 'Poltrona Reclinável',
    description: 'Poltrona reclinável em couro sintético com sistema de massagem. Máximo conforto para relaxar.',
    price: 1599.90,
    image: 'https://images.pexels.com/photos/586799/pexels-photo-586799.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 12,
    colors: ['Preto', 'Marrom', 'Bege']
  },
  {
    id: '6',
    name: 'Cama Box Casal Premium',
    description: 'Cama box casal com colchão ortopédico incluído. Base resistente com design moderno.',
    price: 1799.90,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=500',
    stock: 7,
    colors: ['Branco', 'Cinza', 'Preto']
  }
];

const initialState: StoreState = {
  products: initialProducts,
  cart: [],
  currentView: 'products'
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.product.id === action.product.id && item.selectedColor === action.selectedColor
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id && item.selectedColor === action.selectedColor
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: 1, selectedColor: action.selectedColor }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.productId)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_VIEW':
      return { ...state, currentView: action.view };

    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
} | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}