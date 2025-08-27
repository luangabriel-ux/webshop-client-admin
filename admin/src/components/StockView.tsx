import React, { useState } from 'react';
import { AlertTriangle, Package, Edit2, Check, X } from 'lucide-react';
import { useAdminContext } from '../contexts/AdminContext';

export default function StockView() {
  const { products, updateStock } = useAdminContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (id: string, currentStock: number) => {
    setEditingId(id);
    setEditValue(currentStock.toString());
  };

  const saveEdit = (id: string) => {
    const newStock = parseInt(editValue);
    if (!isNaN(newStock) && newStock >= 0) {
      updateStock(id, newStock);
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const lowStockProducts = products.filter(product => product.stock <= 5);
  const outOfStockProducts = products.filter(product => product.stock === 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Controle de Estoque</h1>
        <p className="text-gray-600">Monitore e atualize o estoque dos produtos</p>
      </div>

      {/* Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outOfStockProducts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-semibold text-red-800">Produtos Esgotados</h2>
            </div>
            <div className="space-y-2">
              {outOfStockProducts.map(product => (
                <div key={product.id} className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-red-600">Estoque: 0 unidades</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {lowStockProducts.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="w-6 h-6 text-yellow-600" />
              <h2 className="text-lg font-semibold text-yellow-800">Estoque Baixo</h2>
            </div>
            <div className="space-y-2">
              {lowStockProducts.filter(p => p.stock > 0).map(product => (
                <div key={product.id} className="bg-white p-3 rounded-lg">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-yellow-600">Estoque: {product.stock} unidades</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stock Management Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Gerenciar Estoque</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Produto</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Preço Unit.</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Estoque</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Valor Total</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.colors.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6">
                    {editingId === product.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          min="0"
                        />
                        <button
                          onClick={() => saveEdit(product.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-800">{product.stock}</span>
                        <button
                          onClick={() => startEdit(product.id, product.stock)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    R$ {(product.price * product.stock).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock === 0 
                        ? 'bg-red-100 text-red-800' 
                        : product.stock <= 5
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Esgotado' : product.stock <= 5 ? 'Baixo' : 'Normal'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => startEdit(product.id, product.stock)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Editar Estoque
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}