
import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameCardProps {
  id: number;
  title: string;
  image: string;
  price: string;
  genre: string;
  rating: number;
  downloads: number;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  image,
  price,
  genre,
  rating,
  downloads
}) => {
  return (
    <div className="game-card group">
      <Link to={`/game/${id}`}>
        {/* Game Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button className="epic-button" onClick={(e) => e.preventDefault()}>
              <Download className="w-4 h-4 mr-2" />
              {price === "Free" ? "Play Now" : "Get Game"}
            </Button>
          </div>

          {/* Price Badge */}
          <div className="absolute top-2 right-2 bg-epic-secondary px-2 py-1 rounded text-white text-sm font-semibold">
            {price}
          </div>
        </div>
      </Link>

      {/* Game Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-epic-accent text-sm font-medium">{genre}</span>
        </div>
        
        <Link to={`/game/${id}`}>
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 hover:text-epic-accent transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 text-sm">{rating}</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            {downloads.toLocaleString()} downloads
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
