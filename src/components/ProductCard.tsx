import React from 'react';
import { Eye } from 'lucide-react';
import { Product } from '../contexts/StoreContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
              Esgotado
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Eye className="text-green-600" size={18} />
        </div>
      </div>

      <div className="p-6" onClick={() => onViewDetails(product)}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? 'Disponível' : 'Indisponível'}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 active:scale-95'
          }`}
        >
          <Eye size={18} />
          <span>
            {product.stock === 0 ? 'Indisponível' : 'Ver Detalhes'}
          </span>
        </button>
      </div>
    </div>
  );
}