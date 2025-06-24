
import React, { useState } from 'react';
import Header from '@/components/Header';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import GameGrid from '@/components/GameGrid';
import SearchWithFilter from '@/components/SearchWithFilter';

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

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <main>
        {/* Search Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <SearchWithFilter onSearch={handleSearch} onFilter={handleFilter} />
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
