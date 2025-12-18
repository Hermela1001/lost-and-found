import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RecentListings from '../components/RecentListings';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <RecentListings />
    </div>
  );
};

export default LandingPage;
