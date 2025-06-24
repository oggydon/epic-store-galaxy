
import React from 'react';
import GameCard from './GameCard';

interface GameGridProps {
  searchQuery: string;
  filters: any;
}

const GameGrid: React.FC<GameGridProps> = ({ searchQuery, filters }) => {
  // Extended mock games data with more variety and categories
  const games = [
    {
      id: 1,
      title: "Cyber Strike 2077",
      price: 29.99,
      originalPrice: 59.99,
      image: "/placeholder.svg",
      rating: 4.8,
      genre: "Action",
      isFree: false
    },
    {
      id: 2,
      title: "Dragon Quest Legends",
      price: 0,
      originalPrice: 0,
      image: "/placeholder.svg",
      rating: 4.9,
      genre: "RPG",
      isFree: true
    },
    {
      id: 3,
      title: "Racing Thunder",
      price: 19.99,
      originalPrice: 29.99,
      image: "/placeholder.svg",
      rating: 4.6,
      genre: "Racing",
      isFree: false
    },
    {
      id: 4,
      title: "Puzzle Master",
      price: 9.99,
      originalPrice: 14.99,
      image: "/placeholder.svg",
      rating: 4.7,
      genre: "Puzzle",
      isFree: false
    },
    {
      id: 5,
      title: "Space Adventure",
      price: 0,
      originalPrice: 0,
      image: "/placeholder.svg",
      rating: 4.5,
      genre: "Adventure",
      isFree: true
    },
    {
      id: 6,
      title: "Strategy Empire",
      price: 39.99,
      originalPrice: 49.99,
      image: "/placeholder.svg",
      rating: 4.4,
      genre: "Strategy",
      isFree: false
    },
    {
      id: 7,
      title: "Mystic Warriors",
      price: 24.99,
      originalPrice: 39.99,
      image: "/placeholder.svg",
      rating: 4.6,
      genre: "Action",
      isFree: false
    },
    {
      id: 8,
      title: "City Builder Pro",
      price: 0,
      originalPrice: 0,
      image: "/placeholder.svg",
      rating: 4.3,
      genre: "Simulation",
      isFree: true
    },
    {
      id: 9,
      title: "Horror Nights",
      price: 15.99,
      originalPrice: 25.99,
      image: "/placeholder.svg",
      rating: 4.2,
      genre: "Horror",
      isFree: false
    },
    {
      id: 10,
      title: "Battle Royale X",
      price: 0,
      originalPrice: 0,
      image: "/placeholder.svg",
      rating: 4.7,
      genre: "Shooter",
      isFree: true
    },
    {
      id: 11,
      title: "Fantasy Quest",
      price: 34.99,
      originalPrice: 49.99,
      image: "/placeholder.svg",
      rating: 4.8,
      genre: "RPG",
      isFree: false
    },
    {
      id: 12,
      title: "Indie Platformer",
      price: 12.99,
      originalPrice: 19.99,
      image: "/placeholder.svg",
      rating: 4.5,
      genre: "Platformer",
      isFree: false
    }
  ];

  // Filter games based on search query and filters
  const filteredGames = games.filter(game => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Genre filter
    const matchesGenre = !filters.genre || game.genre === filters.genre;

    // Price filter
    let matchesPrice = true;
    if (filters.price) {
      switch (filters.price) {
        case 'Free':
          matchesPrice = game.isFree;
          break;
        case 'Under $10':
          matchesPrice = !game.isFree && game.price < 10;
          break;
        case '$10-$30':
          matchesPrice = !game.isFree && game.price >= 10 && game.price <= 30;
          break;
        case '$30-$60':
          matchesPrice = !game.isFree && game.price > 30 && game.price <= 60;
          break;
        case 'Over $60':
          matchesPrice = !game.isFree && game.price > 60;
          break;
      }
    }

    // Rating filter
    let matchesRating = true;
    if (filters.rating) {
      const ratingThreshold = parseInt(filters.rating.charAt(0));
      matchesRating = game.rating >= ratingThreshold;
    }

    return matchesSearch && matchesGenre && matchesPrice && matchesRating;
  });

  // Sort games based on sortBy filter
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return b.id - a.id; // Assuming higher ID means newer
      case 'rating':
        return b.rating - a.rating;
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      default: // 'popular'
        return b.rating - a.rating; // Default to rating for popularity
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Games'}
        </h2>
        <p className="text-gray-400">
          {sortedGames.length} game{sortedGames.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {sortedGames.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl text-gray-400 mb-4">No games found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
