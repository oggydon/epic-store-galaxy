
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  genre?: string;
  isFree?: boolean;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { convertPrice } = useCurrency();
  const navigate = useNavigate();

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/purchase/${game.id}`);
  };

  return (
    <div className="game-card group">
      <Link to={`/game/${game.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {game.originalPrice && game.originalPrice > game.price && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
              -{Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)}%
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-epic-accent transition-colors">
            {game.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-gray-300 text-sm">{game.rating}</span>
            </div>
            {game.genre && (
              <span className="text-xs text-gray-400 bg-epic-gray px-2 py-1 rounded">
                {game.genre}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {game.isFree ? (
                <span className="text-epic-accent font-bold">FREE</span>
              ) : (
                <>
                  <span className="text-white font-bold">{convertPrice(game.price)}</span>
                  {game.originalPrice && game.originalPrice > game.price && (
                    <span className="text-gray-400 text-sm line-through">
                      {convertPrice(game.originalPrice)}
                    </span>
                  )}
                </>
              )}
            </div>
            <Button size="sm" className="epic-button" onClick={handlePurchaseClick}>
              <Download className="w-4 h-4 mr-1" />
              {game.isFree ? 'Get' : 'Buy'}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
