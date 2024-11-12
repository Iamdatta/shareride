import React from 'react';

const Hero = () => {
  return (
    <div className="relative pt-16">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-[600px] object-cover"
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
          alt="Carpooling"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Share rides,<br />save the planet
          </h1>
          <p className="mt-6 text-xl text-gray-100">
            Join the sustainable transportation revolution. Connect with drivers and passengers heading your way.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Driving
            </button>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Book a Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;