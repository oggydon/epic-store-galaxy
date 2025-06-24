
import React, { useState } from 'react';
import Header from '@/components/Header';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import GameGrid from '@/components/GameGrid';
import SearchWithFilter from '@/components/SearchWithFilter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  // Featured games for sidebar with categories
  const featuredGames = [
    { id: 1, title: "Epic Savings", image: "/placeholder.svg", category: "Promotion" },
    { id: 2, title: "Black Myth: Wukong", image: "/placeholder.svg", category: "Action RPG" },
    { id: 3, title: "Stellar Blade", image: "/placeholder.svg", category: "Action" },
    { id: 4, title: "Borderlands 4", image: "/placeholder.svg", category: "Shooter" },
    { id: 5, title: "Bloodstained: The Scarlet Engagement", image: "/placeholder.svg", category: "Metroidvania" },
    { id: 6, title: "Dead by Daylight: Five Nights at Freddy's", image: "/placeholder.svg", category: "Horror" },
    { id: 7, title: "Cyberpunk 2077", image: "/placeholder.svg", category: "RPG" },
    { id: 8, title: "Fortnite", image: "/placeholder.svg", category: "Battle Royale" },
    { id: 9, title: "Grand Theft Auto V", image: "/placeholder.svg", category: "Action" },
    { id: 10, title: "The Witcher 3", image: "/placeholder.svg", category: "RPG" },
    { id: 11, title: "Minecraft", image: "/placeholder.svg", category: "Sandbox" },
    { id: 12, title: "Among Us", image: "/placeholder.svg", category: "Social Deduction" }
  ];

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <main>
        {/* Navigation Bar */}
        <section className="border-b border-epic-gray">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-8 py-4">
              <button className="text-white font-medium border-b-2 border-epic-accent pb-2">
                Discover
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Browse
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                News
              </button>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <SearchWithFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Promotional Banner */}
              <div className="lg:col-span-3">
                <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  
                  {/* Left-aligned content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="ml-8 md:ml-16 text-white max-w-md">
                      <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                        EPIC<br />SAVINGS
                      </h1>
                      <p className="text-sm mb-2 opacity-90 font-medium">JUNE 19 - JULY 3</p>
                      <p className="text-base md:text-lg mb-6 leading-relaxed">
                        Save up to 80% on must-play games and discover new adventures.
                      </p>
                      <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 rounded-lg">
                        Save Now
                      </Button>
                      
                      {/* Games loading indicator */}
                      <div className="mt-6 flex items-center gap-2 text-sm opacity-80">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading featured games...</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative 3D elements */}
                  <div className="absolute top-16 right-16 w-16 h-16 bg-yellow-400 rounded-lg transform rotate-12 opacity-80"></div>
                  <div className="absolute bottom-24 right-32 w-12 h-12 bg-red-500 rounded-full opacity-70"></div>
                  <div className="absolute top-32 right-64 w-8 h-8 bg-green-400 rounded opacity-60"></div>
                  <div className="absolute bottom-16 right-48 w-14 h-14 bg-blue-400 rounded-lg transform -rotate-12 opacity-75"></div>
                </div>
              </div>

              {/* Sidebar with Featured Games */}
              <div className="lg:col-span-1">
                <h3 className="text-white font-semibold mb-4 text-lg">Featured & Recommended</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {featuredGames.map((game) => (
                    <Link 
                      key={game.id} 
                      to={`/game/${game.id}`}
                      className="block bg-card-gradient rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 border border-epic-gray hover:border-epic-secondary"
                    >
                      <div className="flex items-center p-3">
                        <img 
                          src={game.image} 
                          alt={game.title}
                          className="w-12 h-12 rounded object-cover flex-shrink-0"
                        />
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">
                            {game.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {game.category}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games Carousel */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Games</h2>
            <FeaturedCarousel />
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <GameGrid searchQuery={searchQuery} filters={filters} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
