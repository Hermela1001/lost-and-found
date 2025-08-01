import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecentListing from "./components/RecentListings";
import ReportForm from "./components/ReportForm";
import ItemDetails from "./pages/ItemDetails";
import AdminPosts from "./pages/AdminPosts";
import LoginPage from "./pages/login";

import "./App.css";

function HomePage() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/contacts", contactData);
      setStatus("✅ Message sent successfully!");
      setContactData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Hero />
      <RecentListing />

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>About Campus Connect</h2>
          <p>
            BITS lost-and-found is a platform designed to help students and staff find lost items and reconnect them with their rightful owners.
            Our mission is to make campuses safer, more connected, and worry-free by streamlining the process of reporting and recovering lost belongings.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>If you have questions, suggestions, or need assistance, feel free to reach out. We're here to help you!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contactData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={contactData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn green">Send Message</button>
            {status && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{status}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

function App() {
  const currentUserId = parseInt(localStorage.getItem("user_id")); // fallback to 1 if needed

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportForm />} />
          <Route
            path="/items/:id"
            element={
              <ItemDetails
                currentUserId={currentUserId || 1}
                onBack={() => window.history.back()}
              />
            }
          />
          <Route path="/admin-posts" element={<AdminPosts />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
