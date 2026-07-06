import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Collection from './components/Collection';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="font-sans min-h-screen bg-brand-cream text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Collection />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
