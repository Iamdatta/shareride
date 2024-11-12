import React from 'react';
import { Shield, Clock, Users, MapPin } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary-600" />,
      title: "Safe and Secure",
      description: "Verified drivers and passengers with rating system"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: "Flexible Schedule",
      description: "Find rides that match your timeline"
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: "Community Driven",
      description: "Connect with people heading your way"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary-600" />,
      title: "Smart Routes",
      description: "Efficient matching based on your destination"
    }
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose ShareRide</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the future of sustainable transportation
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;