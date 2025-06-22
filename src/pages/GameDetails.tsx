
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Star, Calendar, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const GameDetails = () => {
  const { id } = useParams();

  // Mock game data - in real app, fetch based on ID
  const game = {
    id: parseInt(id || '1'),
    title: "Cyber Legends",
    description: "An epic cyberpunk adventure with stunning visuals and immersive gameplay that takes you into a futuristic world of endless possibilities. Experience cutting-edge graphics, deep storylines, and intense combat mechanics.",
    longDescription: "Cyber Legends is a revolutionary action RPG that pushes the boundaries of mobile gaming. Set in the year 2087, you play as a cyber-enhanced mercenary navigating the neon-lit streets of Neo Tokyo. With over 50 hours of gameplay, multiple story paths, and endless customization options, this game offers an unprecedented gaming experience on mobile devices.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    price: "Free",
    genre: "Action RPG",
    rating: 4.8,
    downloads: 125000,
    releaseDate: "2024-01-15",
    developer: "CyberStudio Games",
    size: "2.5 GB",
    version: "1.4.2",
    requirements: "Android 8.0+, 4GB RAM"
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Game Header */}
            <div className="bg-card rounded-xl p-6 border border-epic-gray mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full md:w-48 h-64 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
                  <p className="text-epic-accent mb-4">{game.genre}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{game.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>{game.downloads.toLocaleString()} downloads</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{game.description}</p>

                  <div className="flex gap-4">
                    <Button className="epic-button flex-1 md:flex-none">
                      <Download className="w-5 h-5 mr-2" />
                      {game.price === "Free" ? "Download Free" : `Buy ${game.price}`}
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="bg-card rounded-xl p-6 border border-epic-gray mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {game.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-xl p-6 border border-epic-gray">
              <h2 className="text-xl font-bold text-white mb-4">About This Game</h2>
              <p className="text-gray-300 leading-relaxed">{game.longDescription}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Info */}
            <div className="bg-card rounded-xl p-6 border border-epic-gray">
              <h3 className="text-lg font-bold text-white mb-4">Game Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Developer</span>
                  <span className="text-white">{game.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version</span>
                  <span className="text-white">{game.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size</span>
                  <span className="text-white">{game.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Requirements</span>
                  <span className="text-white text-sm">{game.requirements}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="text-epic-accent font-bold text-lg">{game.price}</span>
                </div>
              </div>
            </div>

            {/* Related Games */}
            <div className="bg-card rounded-xl p-6 border border-epic-gray">
              <h3 className="text-lg font-bold text-white mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <img
                      src={`https://images.unsplash.com/photo-151${8 + i}709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`}
                      alt={`Related game ${i}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">Game Title {i}</h4>
                      <p className="text-gray-400 text-xs">Action RPG</p>
                      <p className="text-epic-accent text-sm font-bold">Free</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
