import React from 'react';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
const Home = () => {
  return (
    <div className="home-container">
      <Navbar/>
     < HomePage/>
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
