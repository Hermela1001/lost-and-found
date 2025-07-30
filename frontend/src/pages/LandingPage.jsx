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
{/* About Section */}
<section className="about">
  <div className="container">
    <h2>About Campus Connect</h2>
    <p>
      Campus Connect is a platform designed to help students and staff find lost items and reconnect them with their rightful owners. 
      Our mission is to make campuses safer, more connected, and worry-free by streamlining the process of reporting and recovering lost belongings.
    </p>
  </div>
</section>

{/* Contact Section */}
<section className="contact">
  <div className="container">
    <h2>Contact Us</h2>
    <p>If you have questions, suggestions, or need assistance, feel free to reach out. We're here to help you!</p>
    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows="5" required></textarea>
      <button type="submit" className="btn green">Send Message</button>
    </form>
  </div>
</section>

export default LandingPage;
