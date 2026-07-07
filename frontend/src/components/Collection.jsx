import React from 'react';

const Collection = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      name: "Ceylon Cinnamon",
      description: "True cinnamon sticks",
      price: "$12.45",
      image: "/cinnamon.png",
    },
    {
      id: 2,
      name: "Turmeric Powder",
      description: "Pure and vibrant",
      price: "$8.20",
      image: "/turmeric.png",
    },
    {
      id: 3,
      name: "Black Pepper",
      description: "Rich and aromatic",
      price: "$9.50",
      image: "/pepper.png",
    }
  ];

  return (
    <section id="collection" className="w-full py-20 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2a2a2a] mb-6 leading-tight tracking-tight">Our Collection</h2>
          <p className="text-[#2a2a2a]/70 max-w-2xl mx-auto">Handpicked freshness straight from the farm. Explore our finest selection of authentic spices.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#fcf5e5] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow flex flex-col group border border-[#f5e8cd] cursor-pointer"
              onClick={() => onProductClick && onProductClick(product)}
            >
              <div className="w-full h-56 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="flex-1 flex flex-col pt-2">
                <h3 className="text-2xl font-bold text-[#2a2a2a] mb-1">{product.name}</h3>
                <p className="text-xs text-[#2a2a2a]/60 mb-4">{product.description}</p>
                
                <div className="w-full h-px bg-brand-dark/5 mb-4"></div>
                
                <div className="flex items-center w-full mt-auto">
                  <button className="w-full bg-[#2a2a2a] text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider hover:bg-[#E6B754] transition shadow-md border border-transparent">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
