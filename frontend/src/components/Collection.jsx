import React from 'react';

const Collection = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      name: "Black Pepper",
      description: "Rich and aromatic black pepper",
      image: "/gammiriskudu_minimalist.png",
      images: [
        "/gammiriskudu_hero.png",
        "/gammiriskudu_flatlay.png",
        "/gammiriskudu_dynamic.png",
        "/gammiriskudu_lifestyle.png",
        "/gammiriskudu_minimalist.png"
      ],
      pricing: {
        '25g': 130,
        '50g': 240
      },
      defaultSize: '25g'
    },
    {
      id: 2,
      name: "Chilli Powder",
      description: "High quality fine chilli powder",
      image: "/miriskudu_minimalist.png",
      images: [
        "/miriskudu_hero.png",
        "/miriskudu_flatlay.png",
        "/miriskudu_dynamic.png",
        "/miriskudu_lifestyle.png",
        "/miriskudu_minimalist.png"
      ],
      pricing: {
        '50g': 90,
        '100g': 180
      },
      defaultSize: '50g'
    },
    {
      id: 3,
      name: "Crushed Chilli",
      description: "Authentic crushed chilli flakes",
      image: "/kalimiris_minimalist.png",
      images: [
        "/kalimiris_hero.png",
        "/kalimiris_flatlay.png",
        "/kalimiris_dynamic.png",
        "/kalimiris_lifestyle.png",
        "/kalimiris_minimalist.png"
      ],
      pricing: {
        '100g': 180,
        '250g': 450
      },
      defaultSize: '100g'
    },
    {
      id: 4,
      name: "Turmeric Powder",
      description: "Pure and vibrant turmeric powder",
      image: "/kahakudu_hero.png",
      images: [
        "/kahakudu_hero.png",
        "/kahakudu_flatlay.png",
        "/kahakudu_dynamic.png",
        "/kahakudu_lifestyle.png",
        "/kahakudu_minimalist.png"
      ],
      pricing: {
        '25g': 145,
        '50g': 280,
        '100g': 550
      },
      defaultSize: '25g'
    }
  ];

  return (
    <section id="collection" className="w-full py-20 px-6 bg-[#FAF5EC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2a2a2a] mb-6 leading-tight tracking-tight">Our Collection</h2>
          <p className="text-[#2a2a2a]/70 max-w-2xl mx-auto">Handpicked freshness straight from the farm. Explore our finest selection of authentic spices.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#fcf5e5] rounded-[30px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group border border-[#f5e8cd] cursor-pointer relative overflow-hidden"
              onClick={() => onProductClick && onProductClick(product)}
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#EADFC8] rounded-tl-lg pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#EADFC8] rounded-br-lg pointer-events-none"></div>

              <div className="w-full h-48 mb-4 flex items-center justify-center overflow-hidden rounded-2xl relative z-10">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="flex-1 flex flex-col pt-2 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-[#2A2A2A] mb-1 text-center">{product.name}</h3>
                <p className="text-[11px] text-[#9A9286] uppercase tracking-widest text-center mb-4 font-bold">{product.description}</p>
                
                <div className="w-full h-px bg-[#EADFC8] mb-4"></div>
                
                <div className="flex items-center justify-center mb-4 gap-2 text-[#2A2A2A] font-bold">
                  <span>Starting from</span>
                  <span className="text-[#E6B754] text-lg">Rs {product.pricing[product.defaultSize]}</span>
                </div>
                
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
