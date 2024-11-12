import React, { useState } from 'react';
import { useRideStore } from '../../store/rideStore';
import { useBookingStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';
import { MapPin, Calendar, Clock, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const RideList = ({ searchResults }: { searchResults: any[] }) => {
  const user = useAuthStore((state) => state.user);
  const createBooking = useBookingStore((state) => state.createBooking);
  const [bookingStatus, setBookingStatus] = useState<{
    rideId: string | null;
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    rideId: null,
    status: 'idle',
    message: '',
  });

  const handleBooking = async (rideId: string) => {
    if (!user) return;
    
    setBookingStatus({
      rideId,
      status: 'loading',
      message: 'Processing your booking...',
    });
    
    try {
      await createBooking({
        rideId,
        passengerId: user.id,
        seats: 1,
      });
      
      setBookingStatus({
        rideId,
        status: 'success',
        message: 'Ride booked successfully!',
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setBookingStatus({
          rideId: null,
          status: 'idle',
          message: '',
        });
      }, 3000);
    } catch (error) {
      setBookingStatus({
        rideId,
        status: 'error',
        message: 'Booking failed. Please try again.',
      });
    }
  };

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No rides available for your search criteria
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loading':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-primary-600';
    }
  };

  return (
    <div className="space-y-4 mt-8">
      {searchResults.map((ride) => (
        <div
          key={ride.id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{ride.origin}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{ride.destination}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{ride.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{ride.time}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{ride.seats} seats available</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>${ride.price} per seat</span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center space-y-2">
              <button
                onClick={() => handleBooking(ride.id)}
                disabled={bookingStatus.status === 'loading' && bookingStatus.rideId === ride.id}
                className={`${getStatusColor(
                  bookingStatus.rideId === ride.id ? bookingStatus.status : 'idle'
                )} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2`}
              >
                {bookingStatus.rideId === ride.id && bookingStatus.status !== 'idle' ? (
                  <>
                    {bookingStatus.status === 'success' && <CheckCircle className="h-5 w-5" />}
                    {bookingStatus.status === 'error' && <XCircle className="h-5 w-5" />}
                    <span>{bookingStatus.message}</span>
                  </>
                ) : (
                  'Book Ride'
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RideList;