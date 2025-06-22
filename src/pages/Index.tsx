
import React from 'react';
import Header from '@/components/Header';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import GameGrid from '@/components/GameGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      {/* Hero Section with Featured Games */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Games
          </h1>
          <p className="text-gray-300 text-lg">
            Discover the most popular and trending games
          </p>
        </div>
        
        <FeaturedCarousel />
      </section>

      {/* Games Grid Section */}
      <section className="py-12">
        <GameGrid />
      </section>

      {/* Footer */}
      <footer className="bg-epic-darker border-t border-epic-gray py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 GameStore. Built with passion for gamers, by gamers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
