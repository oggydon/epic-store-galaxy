
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PurchasedGame {
  id: number;
  title: string;
  image: string;
  purchaseDate: string;
  price: number;
  isFree: boolean;
}

interface LibraryContextType {
  purchasedGames: PurchasedGame[];
  addGameToLibrary: (game: PurchasedGame) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [purchasedGames, setPurchasedGames] = useState<PurchasedGame[]>([
    {
      id: 1,
      title: "Cyber Strike 2077",
      image: "/placeholder.svg",
      purchaseDate: "2024-01-15",
      price: 29.99,
      isFree: false
    },
    {
      id: 2,
      title: "Dragon Quest Legends",
      image: "/placeholder.svg",
      purchaseDate: "2024-01-10",
      price: 0,
      isFree: true
    }
  ]);

  const addGameToLibrary = (game: PurchasedGame) => {
    setPurchasedGames(prev => {
      // Check if game is already in library
      const existingGame = prev.find(g => g.id === game.id);
      if (existingGame) return prev;
      
      return [...prev, game];
    });
  };

  return (
    <LibraryContext.Provider value={{ purchasedGames, addGameToLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
