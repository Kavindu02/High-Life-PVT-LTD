import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Collection from './components/Collection';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductOverview from './components/ProductOverview';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const saved = sessionStorage.getItem('selectedProduct');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (selectedProduct) {
      sessionStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    } else {
      sessionStorage.removeItem('selectedProduct');
    }
  }, [selectedProduct]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Always scroll to top on refresh, whether on Home or Product Overview
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

  }, [selectedProduct]);

  return (
    <div className="font-sans min-h-screen bg-brand-cream text-brand-dark">
      <Navbar onNavigate={() => {
        setSelectedProduct(null);
        sessionStorage.removeItem('selectedProduct');
      }} />
      <main>
        {selectedProduct ? (
          <ProductOverview product={selectedProduct} onBack={() => {
            setSelectedProduct(null);
            sessionStorage.removeItem('selectedProduct');
          }} />
        ) : (
          <>
            <Hero />
            <About />
            <Collection onProductClick={setSelectedProduct} />
            <Blog />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
