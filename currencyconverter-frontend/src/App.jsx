import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const currencies = [
    { code: "USD", name: "United States Dollar", flag: "🇺🇸" },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
    { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "KRW", name: "South Korean Won", flag: "🇰🇷" },
    { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
    { code: "THB", name: "Thai Baht", flag: "🇹🇭" },
    { code: "ZAR", name: "South African Rand", flag: "🇿🇦" }
  ];

  const convertCurrency = async () => {
    if (!amount || amount <= 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/convert?from=${from}&to=${to}&amount=${amount}`);
      const data = await response.text();
      setResult(parseFloat(data).toFixed(2));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Conversion failed:', error);
      setResult('Error');
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    if (result) {
      setAmount(parseFloat(result));
      setResult(amount.toString());
    }
  };

  useEffect(() => {
    if (amount > 0) {
      const debounceTimer = setTimeout(() => {
        convertCurrency();
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [amount, from, to]);

  const getCurrencyInfo = (code) => currencies.find(c => c.code === code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-2 tracking-tight">
            Currency Converter
          </h1>
          <p className="text-gray-400 text-lg">Real-time exchange rates at your fingertips</p>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Amount Input Card */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:scale-105">
            <h3 className="text-black font-bold text-xl mb-4 flex items-center gap-2">
              💰 Amount
            </h3>
            <input 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              type="number" 
              className="w-full bg-black/10 text-black placeholder-black/60 rounded-2xl px-4 py-3 text-2xl font-bold border-2 border-transparent focus:border-black focus:outline-none transition-all"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          {/* From Currency Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:scale-105 border border-yellow-400/20">
            <h3 className="text-yellow-400 font-bold text-xl mb-4 flex items-center gap-2">
              📤 From
            </h3>
            <select 
              value={from} 
              onChange={e => setFrom(e.target.value)}
              className="w-full bg-yellow-400 text-black rounded-2xl px-4 py-3 font-bold cursor-pointer hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <div className="mt-3 text-yellow-300 text-sm">
              {getCurrencyInfo(from)?.flag} {getCurrencyInfo(from)?.name}
            </div>
          </div>

          {/* Swap Button Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
            <button 
              onClick={swapCurrencies}
              className="bg-black text-yellow-400 rounded-2xl px-6 py-4 font-bold text-lg hover:bg-gray-900 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-2"
            >
              🔄 Swap
            </button>
          </div>

          {/* To Currency Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:scale-105 border border-yellow-400/20">
            <h3 className="text-yellow-400 font-bold text-xl mb-4 flex items-center gap-2">
              📥 To
            </h3>
            <select 
              value={to} 
              onChange={e => setTo(e.target.value)}
              className="w-full bg-yellow-400 text-black rounded-2xl px-4 py-3 font-bold cursor-pointer hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <div className="mt-3 text-yellow-300 text-sm">
              {getCurrencyInfo(to)?.flag} {getCurrencyInfo(to)?.name}
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 border-2 border-yellow-400">
            <h3 className="text-yellow-400 font-bold text-2xl mb-4 flex items-center gap-2">
              💱 Conversion Result
            </h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                  {result ? `${result}` : '0.00'}
                </div>
                <div className="text-yellow-300 text-xl">
                  {amount} {from} = {result || '0.00'} {to}
                </div>
                {lastUpdated && (
                  <div className="text-gray-400 text-sm mt-4">
                    Last updated: {lastUpdated}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { from: 'USD', to: 'INR', label: 'USD → INR' },
            { from: 'EUR', to: 'USD', label: 'EUR → USD' },
            { from: 'GBP', to: 'INR', label: 'GBP → INR' },
            { from: 'JPY', to: 'USD', label: 'JPY → USD' }
          ].map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                setFrom(preset.from);
                setTo(preset.to);
              }}
              className="bg-gray-800 hover:bg-yellow-400 hover:text-black text-yellow-400 rounded-2xl px-4 py-3 font-semibold transition-all duration-300 hover:scale-105 border border-yellow-400/20 hover:border-yellow-400"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Real-time currency conversion • Built with ❤️ by Arghya </p>
        </div>
      </div>
    </div>
  );
}

export default App;