import React, { useState } from 'react';
import { useRideStore } from '../../store/rideStore';
import { MapPin } from 'lucide-react';
import RideList from './RideList';

const RideSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRides = useRideStore((state) => state.searchRides);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = searchRides(origin, destination, date);
    setSearchResults(results);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="From"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="To"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Search Rides
        </button>
      </form>

      <RideList searchResults={searchResults} />
    </div>
  );
};

export default RideSearch;