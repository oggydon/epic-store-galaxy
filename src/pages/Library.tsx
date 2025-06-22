
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const Library = () => {
  // Mock user's games data
  const userGames = [
    {
      id: 1,
      title: "Cyber Strike 2077",
      image: "/placeholder.svg",
      downloadDate: "2024-01-15",
      rating: 4.8,
      size: "2.3 GB"
    },
    {
      id: 2,
      title: "Dragon Quest Legends",
      image: "/placeholder.svg",
      downloadDate: "2024-01-10",
      rating: 4.9,
      size: "1.8 GB"
    }
  ];

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">My Library</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2">{game.title}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{game.rating}</span>
                  </div>
                  <span>{game.size}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Downloaded: {game.downloadDate}</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 epic-button" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Re-download
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/game/${game.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {userGames.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-400 mb-4">Your library is empty</h3>
            <p className="text-gray-500 mb-6">Start building your collection by downloading games from the store</p>
            <Button className="epic-button" asChild>
              <Link to="/">Browse Store</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
