
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock exchange rates - in a real app, these would come from an API
const exchangeRates = {
  USD: { rate: 1, symbol: '$' },
  EUR: { rate: 0.85, symbol: '€' },
  GBP: { rate: 0.73, symbol: '£' },
  JPY: { rate: 110, symbol: '¥' },
  INR: { rate: 75, symbol: '₹' },
  CAD: { rate: 1.25, symbol: 'C$' },
  AUD: { rate: 1.35, symbol: 'A$' },
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const setCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    console.log('Currency changed to:', currency);
  };

  const convertPrice = (price: number): string => {
    const currency = exchangeRates[selectedCurrency as keyof typeof exchangeRates];
    const convertedPrice = price * currency.rate;
    
    if (selectedCurrency === 'JPY' || selectedCurrency === 'INR') {
      return `${currency.symbol}${Math.round(convertedPrice)}`;
    }
    
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
