import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, CreditCard, MapPin } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function Cart() {
  const { state, dispatch } = useStore();
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [address, setAddress] = React.useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    complement: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', productId, quantity: newQuantity });
    }
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const sendWhatsAppMessage = () => {
    if (!paymentMethod) {
      alert('Por favor, selecione uma forma de pagamento');
      return;
    }
    
    if (!address.street || !address.number || !address.neighborhood || !address.city) {
      alert('Por favor, preencha todos os campos obrigatórios do endereço');
      return;
    }

    const phoneNumber = '+5562993294939';
    let message = `🛏️ *Pedido - Gabriela Colchões*\n\n`;
    
    state.cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Cor: ${item.selectedColor}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preço unitário: ${formatPrice(item.product.price)}\n`;
      message += `   Subtotal: ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });

    message += `📊 *Resumo do Pedido:*\n`;
    message += `Total de itens: ${getTotalItems()}\n`;
    message += `Valor total: ${formatPrice(getTotalPrice())}\n\n`;
    
    message += `💳 *Forma de Pagamento:* ${paymentMethod}\n\n`;
    
    message += `📍 *Endereço de Entrega:*\n`;
    message += `${address.street}, ${address.number}\n`;
    message += `${address.neighborhood}\n`;
    message += `${address.city}\n`;
    if (address.complement) {
      message += `Complemento: ${address.complement}\n`;
    }
    message += `\n`;
    
    message += `Gostaria de finalizar este pedido! 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (state.cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-gray-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 mb-8">
            Adicione alguns produtos incríveis ao seu carrinho!
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'products' })}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors transform hover:scale-105"
          >
            Ver Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <ShoppingBag className="text-green-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-900">
          Meu Carrinho
        </h1>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.cart.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600">Cor:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      {item.selectedColor}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-green-600">
                      {formatPrice(item.product.price)}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Subtotal: </span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Resumo do Pedido
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} itens)</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span className="text-green-600">A combinar</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-green-600">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CreditCard className="text-green-600" size={20} />
                <h4 className="text-lg font-semibold text-gray-900">Forma de Pagamento</h4>
              </div>
              <div className="space-y-2">
                {['Dinheiro', 'PIX', 'Cartão de Débito', 'Cartão de Crédito', 'Parcelado'].map((method) => (
                  <label key={method} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Address Form */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="text-green-600" size={20} />
                <h4 className="text-lg font-semibold text-gray-900">Endereço de Entrega</h4>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Rua/Avenida *"
                    value={address.street}
                    onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                    className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nº *"
                    value={address.number}
                    onChange={(e) => setAddress(prev => ({ ...prev, number: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Bairro *"
                  value={address.neighborhood}
                  onChange={(e) => setAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Cidade *"
                  value={address.city}
                  onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Complemento (opcional)"
                  value={address.complement}
                  onChange={(e) => setAddress(prev => ({ ...prev, complement: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-500">* Campos obrigatórios</p>
              </div>
            </div>

            <button
              onClick={sendWhatsAppMessage}
              disabled={!paymentMethod || !address.street || !address.number || !address.neighborhood || !address.city}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Enviar Pedido via WhatsApp</span>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Preencha todos os dados para enviar o pedido via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}