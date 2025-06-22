
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CurrencySelector = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  ];

  const currentCurrency = currencies.find(c => c.code === selectedCurrency);

  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency.code);
    setIsOpen(false);
    console.log('Currency changed to:', currency.code);
    // Here you would typically update a global state or context
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-white"
      >
        <DollarSign className="w-4 h-4 mr-1" />
        <span>{currentCurrency?.symbol} {selectedCurrency}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-epic-gray rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="py-2">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencyChange(currency)}
                className={`w-full px-4 py-2 text-left hover:bg-epic-gray transition-colors ${
                  selectedCurrency === currency.code
                    ? 'bg-epic-secondary text-white'
                    : 'text-gray-300'
                }`}
              >
                <span className="font-medium">{currency.symbol} {currency.code}</span>
                <span className="text-sm text-gray-400 ml-2">{currency.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
