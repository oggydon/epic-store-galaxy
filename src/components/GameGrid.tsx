
import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GameCard from './GameCard';

interface Game {
  id: number;
  title: string;
  image: string;
  price: string;
  genre: string;
  rating: number;
  downloads: number;
}

const GameGrid = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock games data
  const games: Game[] = [
    {
      id: 1,
      title: "Neon Runner",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "Free",
      genre: "Action",
      rating: 4.5,
      downloads: 150000
    },
    {
      id: 2,
      title: "Dragon Quest Legends",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "$19.99",
      genre: "RPG",
      rating: 4.8,
      downloads: 89000
    },
    {
      id: 3,
      title: "Puzzle Master",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "$9.99",
      genre: "Puzzle",
      rating: 4.3,
      downloads: 234000
    },
    {
      id: 4,
      title: "Space Combat",
      image: "https://images.unsplash.com/photo-1614732414444-096a5cd26fd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "$24.99",
      genre: "Action",
      rating: 4.6,
      downloads: 178000
    },
    {
      id: 5,
      title: "Fantasy Kingdom",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "Free",
      genre: "Strategy",
      rating: 4.4,
      downloads: 456000
    },
    {
      id: 6,
      title: "Racing Thunder",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "$29.99",
      genre: "Racing",
      rating: 4.7,
      downloads: 123000
    }
  ];

  const genres = ['all', 'Action', 'RPG', 'Puzzle', 'Strategy', 'Racing', 'Adventure'];

  const filteredGames = games.filter(game => 
    selectedGenre === 'all' || game.genre === selectedGenre
  );

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        const priceA = a.price === 'Free' ? 0 : parseFloat(a.price.replace('$', ''));
        const priceB = b.price === 'Free' ? 0 : parseFloat(b.price.replace('$', ''));
        return priceA - priceB;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Browse Games</h2>
          <p className="text-gray-400">
            Discover amazing games from our collection of {games.length} titles
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-epic-gray rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-white font-medium">Filters:</span>
        </div>

        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-full md:w-48 bg-epic-dark border-epic-gray-light">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent className="bg-epic-dark border-epic-gray-light">
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre} className="text-white hover:bg-epic-gray">
                {genre === 'all' ? 'All Genres' : genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48 bg-epic-dark border-epic-gray-light">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-epic-dark border-epic-gray-light">
            <SelectItem value="popular" className="text-white hover:bg-epic-gray">Most Popular</SelectItem>
            <SelectItem value="rating" className="text-white hover:bg-epic-gray">Highest Rated</SelectItem>
            <SelectItem value="price-low" className="text-white hover:bg-epic-gray">Price: Low to High</SelectItem>
            <SelectItem value="name" className="text-white hover:bg-epic-gray">Name A-Z</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-gray-400 text-sm flex items-center">
          Showing {sortedGames.length} games
        </div>
      </div>

      {/* Games Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {sortedGames.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <Button className="epic-button text-lg px-8 py-3">
          Load More Games
        </Button>
      </div>
    </div>
  );
};

export default GameGrid;
