import React, { useState } from 'react';
import { X, ShoppingCart, Palette } from 'lucide-react';
import { Product, useStore } from '../contexts/StoreContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { dispatch } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!isOpen || !product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product.stock > 0 && selectedColor) {
      dispatch({ type: 'ADD_TO_CART', product, selectedColor });
      onClose();
      // Reset selected color for next time
      setSelectedColor('');
    }
  };

  const handleClose = () => {
    setSelectedColor('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Detalhes do Produto</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                      Esgotado
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Palette className="text-green-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Cores Disponíveis
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`p-3 text-left border rounded-lg transition-all ${
                          selectedColor === color
                            ? 'border-green-600 bg-green-50 text-green-700'
                            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <span className="font-medium">{color}</span>
                      </button>
                    ))}
                  </div>
                  {!selectedColor && product.stock > 0 && (
                    <p className="text-sm text-orange-600 mt-2">
                      * Selecione uma cor para adicionar ao carrinho
                    </p>
                  )}
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || !selectedColor}
                  className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-medium transition-all duration-200 ${
                    product.stock === 0 || !selectedColor
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 active:scale-95'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>
                    {product.stock === 0 
                      ? 'Produto Indisponível' 
                      : !selectedColor 
                      ? 'Selecione uma Cor'
                      : 'Adicionar ao Carrinho'
                    }
                  </span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Informações Importantes</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ Entrega gratuita na região</li>
                  <li>🔧 Montagem inclusa no preço</li>
                  <li>🛡️ Garantia de qualidade</li>
                  <li>📱 Atendimento via WhatsApp</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}