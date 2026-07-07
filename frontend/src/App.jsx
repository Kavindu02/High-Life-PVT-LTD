import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Collection from './components/Collection';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductOverview from './components/ProductOverview';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const saved = sessionStorage.getItem('selectedProduct');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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

  const isAuthPage = currentView === 'login' || currentView === 'register';

  return (
    <div className={`font-sans min-h-screen ${isAuthPage ? 'bg-[#0a0a0a]' : 'bg-brand-cream text-brand-dark'}`}>
      {!isAuthPage && (
        <Navbar 
          user={user}
          onNavigate={() => {
            setSelectedProduct(null);
            sessionStorage.removeItem('selectedProduct');
            setCurrentView('home');
          }} 
          onNavigateToLogin={() => { setCurrentView('login'); window.scrollTo(0, 0); }}
          onNavigateToRegister={() => { setCurrentView('register'); window.scrollTo(0, 0); }}
          onNavigateToProfile={() => { setCurrentView('profile'); window.scrollTo(0, 0); }}
          onLogout={() => { setUser(null); setCurrentView('login'); window.scrollTo(0, 0); }}
        />
      )}
      <main>
        {currentView === 'login' ? (
          <Login 
            onLogin={(userData) => { setUser(userData); setCurrentView('home'); }} 
            onNavigateToRegister={() => { setCurrentView('register'); window.scrollTo(0, 0); }}
            onNavigateToHome={() => { setCurrentView('home'); window.scrollTo(0, 0); }}
          />
        ) : currentView === 'register' ? (
          <Register 
            onRegister={() => { setCurrentView('login'); window.scrollTo(0, 0); }}
            onNavigateToLogin={() => { setCurrentView('login'); window.scrollTo(0, 0); }}
            onNavigateToHome={() => { setCurrentView('home'); window.scrollTo(0, 0); }}
          />
        ) : currentView === 'profile' ? (
          <Profile 
            user={user} 
            onLogout={() => { setUser(null); setCurrentView('login'); window.scrollTo(0, 0); }}
          />
        ) : selectedProduct ? (
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
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
