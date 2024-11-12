import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LoginForm from './components/Auth/LoginForm';
import RideSearch from './components/Rides/RideSearch';
import AddRide from './components/Rides/AddRide';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
              </>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <RideSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/offer-ride"
            element={
              <PrivateRoute>
                <div className="pt-16">
                  <AddRide />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;