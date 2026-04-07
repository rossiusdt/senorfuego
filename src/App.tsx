import { MapPin, Clock, Music, ShoppingCart, Menu, X, Globe, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    individual: 1,
    mesa5: 1,
  });

  const tickets = [
    {
      id: 'individual',
      name: 'OPEN BAR + OPEN FOOD (Individual)',
      price: 'R$137,00',
      color: 'bg-amber-100',
      borderColor: 'border-amber-500',
      textColor: 'text-amber-900',
      checkoutUrl: 'https://seguro.SEGUROPAGUER.CFD/api/public/shopify?product=2984071739644&store=29840',
    },
    {
      id: 'mesa5',
      name: 'MESA 5 PESSOAS',
      price: 'R$497,00',
      color: 'bg-red-100',
      borderColor: 'border-red-500',
      textColor: 'text-red-900',
      checkoutUrl: 'https://seguro.SEGUROPAGUER.CFD/api/public/shopify?product=2984075326696&store=29840',
    },
  ];

  const handleQuantityChange = (ticketId: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, Math.min(10, prev[ticketId] + change));
      return { ...prev, [ticketId]: newQuantity };
    });
  };

  const handleCompra = () => {
    if (!selectedTicket) return;
    const ticket = tickets.find(t => t.id === selectedTicket);
    if (ticket) {
      const quantity = quantities[selectedTicket];
      window.location.href = `${ticket.checkoutUrl}&quantity=${quantity}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/q2logo_(2).png" alt="Q2 Ingressos" className="h-10" />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-blue-200 transition">Home</a>
              <a href="#" className="hover:text-blue-200 transition">Atendimento</a>
              <a href="#" className="hover:text-blue-200 transition flex items-center gap-1">
                <Globe className="w-4 h-4" /> PT
              </a>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-3 pb-4">
              <a href="#" className="block hover:text-blue-200 transition">Home</a>
              <a href="#" className="block hover:text-blue-200 transition">Atendimento</a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Event Poster */}
            <div className="mb-8">
              <img
                src="/Gemini_Generated_Image_5dsfv35dsfv35dsf.png"
                alt="Señor Fuego"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Event Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Señor Fuego
            </h2>

            {/* Event Info */}
            <div className="space-y-3 mb-8 text-gray-700">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-lg">Sábado, 27 de junho - 13:00</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-lg">Hotel Marques Plaza, Pouso Alegre</span>
              </div>
            </div>

            {/* Ticket Selection - Mobile Only */}
            <div className="lg:hidden mb-8">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Selecione o ingresso</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Ingressos reservados apenas após o acesso à tela de pagamento, sujeitos à disponibilidade.
                </p>

                <div className="space-y-3 mb-6">
                  {tickets.map((ticket) => (
                    <div key={ticket.id}>
                      <button
                        onClick={() => setSelectedTicket(ticket.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition ${
                          selectedTicket === ticket.id
                            ? `${ticket.color} ${ticket.borderColor} border-2`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-900'}`}>
                          {ticket.name}
                        </div>
                        <div className={`text-sm ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-600'}`}>
                          por {ticket.price}
                        </div>
                      </button>
                      {selectedTicket === ticket.id && (
                        <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(ticket.id, -1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                              disabled={quantities[ticket.id] <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                              {quantities[ticket.id]}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(ticket.id, 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                              disabled={quantities[ticket.id] >= 10}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCompra}
                  disabled={!selectedTicket}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg ${
                    selectedTicket
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  COMPRAR INGRESSO
                </button>
              </div>
            </div>


            {/* Event Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">O evento</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Informações do Evento</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Data:</strong> Sábado, 27 de junho - 13:00</p>
                      <p><strong>Local:</strong> Hotel Marques Plaza, Pouso Alegre</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Setores</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-6 shadow-md">
                    <h4 className="font-bold text-amber-900 text-xl mb-2">OPEN BAR + OPEN FOOD</h4>
                    <p className="text-amber-800">Acesso livre a bebidas e comidas durante todo o evento</p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-500 rounded-lg p-6 shadow-md">
                    <h4 className="font-bold text-red-900 text-xl mb-2">MESA 5 PESSOAS OPEN BAR + OPEN FOOD</h4>
                    <p className="text-red-800">Mesa exclusiva para 5 pessoas com open bar e open food inclusos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Selection - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Selecione o ingresso</h3>
              <p className="text-sm text-gray-600 mb-6">
                Ingressos reservados apenas após o acesso à tela de pagamento, sujeitos à disponibilidade.
              </p>

              <div className="space-y-3 mb-6">
                {tickets.map((ticket) => (
                  <div key={ticket.id}>
                    <button
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition ${
                        selectedTicket === ticket.id
                          ? `${ticket.color} ${ticket.borderColor} border-2`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`font-semibold ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-900'}`}>
                        {ticket.name}
                      </div>
                      <div className={`text-sm ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-600'}`}>
                        por {ticket.price}
                      </div>
                    </button>
                    {selectedTicket === ticket.id && (
                      <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(ticket.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            disabled={quantities[ticket.id] <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                            {quantities[ticket.id]}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(ticket.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            disabled={quantities[ticket.id] >= 10}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleCompra}
                disabled={!selectedTicket}
                className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg ${
                  selectedTicket
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                COMPRAR INGRESSO
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2026 Q2 Ingressos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
