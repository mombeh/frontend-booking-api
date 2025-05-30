import React from 'react';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div className="home-container">
      <Navbar/>
     < HomePage/>
      <Footer/>     
    </div>
  );
};

export default Home;
