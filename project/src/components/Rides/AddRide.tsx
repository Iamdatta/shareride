import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRideStore } from '../../store/rideStore';
import { MapPin, Calendar, Clock, DollarSign, Users } from 'lucide-react';

const AddRide = () => {
  const user = useAuthStore((state) => state.user);
  const addRide = useRideStore((state) => state.addRide);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: '1', // Changed to string to avoid NaN warning
    price: '0', // Changed to string to avoid NaN warning
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addRide({
      driverId: user.id,
      ...formData,
      seats: parseInt(formData.seats, 10),
      price: parseFloat(formData.price),
    });

    setFormData({
      origin: '',
      destination: '',
      date: '',
      time: '',
      seats: '1',
      price: '0',
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'seats' | 'price') => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Offer a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="From"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="To"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="time"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-6]"
              placeholder="Available seats"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData.seats}
              onChange={(e) => handleNumberChange(e, 'seats')}
              required
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              inputMode="decimal"
              placeholder="Price per seat"
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={formData.price}
              onChange={(e) => handleNumberChange(e, 'price')}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Offer Ride
        </button>
      </form>
    </div>
  );
};

export default AddRide;