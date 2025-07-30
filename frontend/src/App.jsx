import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecentListing from './components/RecentListings';
import ReportForm from './components/ReportForm';
import ItemDetails from './pages/ItemDetails';
import AdminPosts from './pages/AdminPosts';
import LoginPage from './pages/login'; // ✅ Imported LoginPage

import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <RecentListing />

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>About Campus Connect</h2>
          <p>
            BITS lost-and-found  is a platform designed to help students and staff find lost items and reconnect them with their rightful owners. 
            Our mission is to make campuses safer, more connected, and worry-free by streamlining the process of reporting and recovering lost belongings.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
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
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/admin-posts" element={<AdminPosts />} />
          <Route path="/login" element={<LoginPage />} /> {/* ✅ Login route added */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
