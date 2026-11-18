import React from 'react';
import BannerSection from './Components/Home/BannerSection';
import Footer from './Components/Home/Footer';
import Navbar from './Components/Home/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <BannerSection />
      <Footer />
    </div>
  );
};

export default HomePage;