export interface User {
  id: string;
  name: string;
  email: string;
  role: 'driver' | 'passenger';
  rating: number;
}

export interface Ride {
  id: string;
  driverId: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface Booking {
  id: string;
  rideId: string;
  passengerId: string;
  seats: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}