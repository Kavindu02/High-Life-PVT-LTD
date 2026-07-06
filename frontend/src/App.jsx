import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
