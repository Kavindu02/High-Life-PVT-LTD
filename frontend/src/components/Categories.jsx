import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="shop" className="py-12 px-6 md:px-12 bg-brand-cream pt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className={`${cat.bg} p-8 rounded-sm shadow-sm flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-md duration-300`}>
            <div className="text-4xl mb-6 text-brand-brown">{cat.icon}</div>
            <h3 className="text-2xl font-serif text-brand-brown mb-4">{cat.title}</h3>
            <p className="text-sm text-brand-light-brown mb-8 flex-grow">
              {cat.description}
            </p>
            <div className="w-full flex justify-between items-center border-t border-brand-brown/20 pt-4">
               <span className="text-xs uppercase tracking-widest text-brand-brown font-semibold">{cat.price}</span>
               <button className="text-xs uppercase tracking-widest text-brand-brown border-b border-brand-brown hover:text-brand-light-brown">
                 Explore
               </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <h2 className="text-4xl font-serif text-brand-brown">Showcase</h2>
        <div className="w-16 h-px bg-brand-brown mx-auto mt-4"></div>
      </div>
    </section>
  );
};

export default Categories;
