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
import Cart from './components/Cart';
import SideCart from './components/SideCart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import Loader from './components/Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4800); // 4 seconds loading to allow full animation
    return () => clearTimeout(timer);
  }, []);
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      window.history.replaceState(null, '', window.location.pathname);
      return 'admin';
    }
    const saved = sessionStorage.getItem('currentView');
    return saved ? saved : 'home';
  });

  useEffect(() => {
    sessionStorage.setItem('currentView', currentView);
  }, [currentView]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedProduct, setSelectedProduct] = useState(() => {
    const saved = sessionStorage.getItem('selectedProduct');
    return saved ? JSON.parse(saved) : null;
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [buyNowItem, setBuyNowItem] = useState(null);
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);

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
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, size, quantity = 1) => {
    setCartItems(prev => {
      // product.id might not exist, but let's assume they have id or name. Let's use name as fallback.
      const productId = product.id || product.name;
      const existing = prev.find(item => (item.product.id || item.product.name) === productId && item.size === size);
      if (existing) {
        return prev.map(item =>
          (item.product.id || item.product.name) === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
  };

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Always scroll to top on refresh, whether on Home or Product Overview
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

  }, [selectedProduct]);

  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('adminUser');
    }
  }, [adminUser]);

  const isAuthPage = currentView === 'login' || currentView === 'register' || currentView === 'admin';

  return (
    <div className={`font-sans min-h-screen ${isAuthPage ? 'bg-[#0a0a0a]' : 'bg-brand-cream text-brand-dark'}`}>
      <Loader isVisible={isLoading} />
      {!isAuthPage && (
        <Navbar
          currentView={currentView}
          user={user}
          cartItems={cartItems}
          isProductOverview={!!selectedProduct}
          onNavigate={() => {
            setSelectedProduct(null);
            sessionStorage.removeItem('selectedProduct');
            setCurrentView('home');
          }}
          onNavigateToLogin={() => { setCurrentView('login'); window.scrollTo(0, 0); }}
          onNavigateToRegister={() => { setCurrentView('register'); window.scrollTo(0, 0); }}
          onNavigateToProfile={() => { setCurrentView('profile'); window.scrollTo(0, 0); }}
          onOpenSideCart={() => setIsSideCartOpen(true)}
          onLogout={() => { setUser(null); setCurrentView('login'); window.scrollTo(0, 0); }}
        />
      )}
      <SideCart
        isOpen={isSideCartOpen}
        onClose={() => setIsSideCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        onViewFullCart={() => {
          setIsSideCartOpen(false);
          setCurrentView('cart');
          window.scrollTo(0, 0);
        }}
        onContinueShopping={() => {
          setIsSideCartOpen(false);
          setCurrentView('home');
          setTimeout(() => {
            const element = document.getElementById('collection');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
        onCheckout={() => {
          setBuyNowItem(null);
          setIsSideCartOpen(false);
          setCurrentView('checkout');
          window.scrollTo(0, 0);
        }}
      />
      <main>
        {currentView === 'admin' ? (
          !adminUser ? (
            <Login
              onLogin={(userData) => { setUser(userData); setCurrentView('home'); }}
              onAdminLogin={(adminData) => { 
                setAdminUser(adminData); 
              }}
              onNavigateToRegister={() => { setCurrentView('register'); window.scrollTo(0, 0); }}
              onNavigateToHome={() => { setCurrentView('home'); window.scrollTo(0, 0); }}
            />
          ) : (
            <AdminDashboard onLogout={() => { setAdminUser(null); setCurrentView('login'); }} />
          )
        ) : currentView === 'login' ? (
          <Login
            onLogin={(userData) => { setUser(userData); setCurrentView('home'); }}
            onAdminLogin={(adminData) => { 
              setAdminUser(adminData); 
              setCurrentView('home');
              window.open(window.location.origin + '/#admin', '_blank'); 
            }}
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
        ) : currentView === 'cart' ? (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            onNavigateToHome={() => {
              setCurrentView('home');
              setTimeout(() => {
                const element = document.getElementById('collection');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            onCheckout={() => { setBuyNowItem(null); setCurrentView('checkout'); window.scrollTo(0, 0); }}
          />
        ) : currentView === 'checkout' ? (
          <Checkout cartItems={buyNowItem || cartItems} />
        ) : selectedProduct ? (
          <ProductOverview 
            product={selectedProduct} 
            onAddToCart={handleAddToCart} 
            onBack={() => {
              setSelectedProduct(null);
              sessionStorage.removeItem('selectedProduct');
            }}
            onCheckout={(productToBuy) => { 
              if (productToBuy) {
                setBuyNowItem([productToBuy]);
              } else {
                setBuyNowItem(null);
              }
              setCurrentView('checkout'); 
              window.scrollTo(0, 0); 
            }}
          />
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
