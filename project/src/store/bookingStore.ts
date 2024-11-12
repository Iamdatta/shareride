import { create } from 'zustand';
import { Booking } from '../types';

interface BookingState {
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'status'>) => Promise<void>;
  getUserBookings: (userId: string) => Booking[];
  getBookingsByRide: (rideId: string) => Booking[];
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  createBooking: async (booking) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if user already has a booking for this ride
    const existingBooking = get().bookings.find(
      (b) => b.rideId === booking.rideId && b.passengerId === booking.passengerId
    );
    
    if (existingBooking) {
      throw new Error('You have already booked this ride');
    }
    
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
    };
    
    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
  },
  getUserBookings: (userId) => {
    return get().bookings.filter(
      (booking) => booking.passengerId === userId
    );
  },
  getBookingsByRide: (rideId) => {
    return get().bookings.filter(
      (booking) => booking.rideId === rideId
    );
  },
}));