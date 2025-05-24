import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">📅 EasyBook</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Book Appointments with Ease</h1>
        <p>Your time matters. Let’s make booking stress-free.</p>
        <Link to="/register" className="cta-btn">Get Started</Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>🎯 Simple Booking</h3>
            <p>Book appointments in just a few clicks.</p>
          </div>
          <div className="feature-item">
            <h3>✅ Verified Providers</h3>
            <p>Work with trusted and verified service providers.</p>
          </div>
          <div className="feature-item">
            <h3>⏰ Flexible Time Slots</h3>
            <p>Choose time slots that suit your schedule.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} EasyBook. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms</a> | <a href="#">Privacy</a> | <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
