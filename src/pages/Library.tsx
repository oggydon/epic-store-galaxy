
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, Calendar, ArrowLeft, User } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useLibrary } from '@/contexts/LibraryContext';

const Library = () => {
  const { isLoggedIn } = useUser();
  const { purchasedGames } = useLibrary();

  // If not logged in, show login prompt
  if (!isLoggedIn) {
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

          <div className="max-w-md mx-auto text-center py-16">
            <div className="bg-card rounded-xl p-8 border border-epic-gray">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
              <p className="text-gray-400 mb-6">
                You need to login to access your game library. Sign in to view your purchased and downloaded games.
              </p>
              <div className="space-y-3">
                <Button className="w-full epic-button" asChild>
                  <Link to="/login">
                    Sign In to View Library
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/signup">
                    Create New Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {purchasedGames.map((game) => (
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
                  <span>{game.isFree ? 'FREE' : `$${game.price}`}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Added: {game.purchaseDate}</span>
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

        {purchasedGames.length === 0 && (
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
