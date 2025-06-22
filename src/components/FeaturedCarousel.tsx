
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedGame {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  genre: string;
  rating: number;
}

const FeaturedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock featured games data
  const featuredGames: FeaturedGame[] = [
    {
      id: 1,
      title: "Cyber Legends",
      description: "An epic cyberpunk adventure with stunning visuals and immersive gameplay that takes you into a futuristic world of endless possibilities.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: "Free",
      genre: "Action RPG",
      rating: 4.8
    },
    {
      id: 2,
      title: "Mystic Realms",
      description: "Explore magical worlds filled with ancient mysteries, powerful spells, and legendary creatures in this fantasy masterpiece.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80",
      price: "$29.99",
      genre: "Fantasy RPG",
      rating: 4.9
    },
    {
      id: 3,
      title: "Space Odyssey",
      description: "Embark on an interstellar journey across the galaxy, commanding your own spaceship and discovering new worlds and civilizations.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      price: "$39.99",
      genre: "Space Sim",
      rating: 4.7
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  const currentGame = featuredGames[currentSlide];

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentGame.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-4">
              <span className="bg-epic-secondary/20 text-epic-secondary px-3 py-1 rounded-full text-sm font-medium">
                {currentGame.genre}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {currentGame.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
              {currentGame.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-yellow-400 ${i < Math.floor(currentGame.rating) ? 'opacity-100' : 'opacity-30'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-white font-semibold">{currentGame.rating}</span>
              </div>
              <span className="text-2xl font-bold text-epic-accent">
                {currentGame.price}
              </span>
            </div>

            <div className="flex gap-4">
              <Button className="epic-button text-lg px-8 py-3">
                <Download className="w-5 h-5 mr-2" />
                {currentGame.price === "Free" ? "Play Now" : "Get Game"}
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
