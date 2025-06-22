
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchWithFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

const SearchWithFilter: React.FC<SearchWithFilterProps> = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    price: '',
    rating: '',
    sortBy: 'popular'
  });

  const genres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Puzzle', 'Racing', 'Sports', 'Indie'];
  const priceRanges = ['Free', 'Under $10', '$10-$30', '$30-$60', 'Over $60'];
  const ratings = ['4+ Stars', '3+ Stars', '2+ Stars', 'Any Rating'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      genre: '',
      price: '',
      rating: '',
      sortBy: 'popular'
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'popular').length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-12 bg-epic-gray border-epic-gray-light focus:border-epic-secondary text-white"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-epic-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-card rounded-lg p-6 border border-epic-gray mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={clearFilters}>
                Clear All
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowFilters(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full bg-epic-gray border border-epic-gray-light rounded px-3 py-2 text-white"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="w-full bg-epic-gray border border-epic-gray-light rounded px-3 py-2 text-white"
              >
                <option value="">Any Price</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full bg-epic-gray border border-epic-gray-light rounded px-3 py-2 text-white"
              >
                <option value="">Any Rating</option>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full bg-epic-gray border border-epic-gray-light rounded px-3 py-2 text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWithFilter;
