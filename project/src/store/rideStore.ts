import { create } from 'zustand';
import { Ride } from '../types';

interface RideState {
  rides: Ride[];
  addRide: (ride: Omit<Ride, 'id' | 'status'>) => void;
  searchRides: (origin: string, destination: string, date: string) => Ride[];
}

export const useRideStore = create<RideState>((set, get) => ({
  rides: [],
  addRide: (ride) => {
    const newRide: Ride = {
      ...ride,
      id: Math.random().toString(36).substr(2, 9),
      status: 'scheduled',
    };
    set((state) => ({ rides: [...state.rides, newRide] }));
  },
  searchRides: (origin, destination, date) => {
    return get().rides.filter(
      (ride) =>
        ride.origin.toLowerCase().includes(origin.toLowerCase()) &&
        ride.destination.toLowerCase().includes(destination.toLowerCase()) &&
        ride.date === date &&
        ride.status === 'scheduled'
    );
  },
}));