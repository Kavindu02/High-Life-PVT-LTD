import React from 'react';

const Collection = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      name: "Pepper powder",
      description: "Rich and aromatic black pepper",
      image: "/gammiriskudu_minimalist.webp",
      images: [
        "/gammiriskudu_hero.webp",
        "/gammiriskudu_flatlay.webp",
        "/gammiriskudu_dynamic.webp",
        "/gammiriskudu_lifestyle.webp",
        "/gammiriskudu_minimalist.webp"
      ],
      pricing: {
        '25g': "130.00",
        '50g': "240.00"
      },
      defaultSize: '25g'
    },
    {
      id: 2,
      name: "Chilli Powder",
      description: "High quality fine chilli powder",
      image: "/miriskudu_minimalist.webp",
      images: [
        "/miriskudu_hero.webp",
        "/miriskudu_flatlay.webp",
        "/miriskudu_dynamic.webp",
        "/miriskudu_lifestyle.webp",
        "/miriskudu_minimalist.webp"
      ],
      pricing: {
        '50g': "90.00",
        '100g': "180.00"
      },
      defaultSize: '50g'
    },
    {
      id: 3,
      name: "Chilli pieces",
      description: "Authentic crushed chilli flakes",
      image: "/kalimiris_minimalist.webp",
      images: [
        "/kalimiris_hero.webp",
        "/kalimiris_flatlay.webp",
        "/kalimiris_dynamic.webp",
        "/kalimiris_lifestyle.webp",
        "/kalimiris_minimalist.webp"
      ],
      pricing: {
        '100g': "180.00",
        '250g': "450.00"
      },
      defaultSize: '100g'
    },
    {
      id: 4,
      name: "Turmeric Powder",
      description: "Pure and vibrant turmeric powder",
      image: "/kahakudu_minimalist.webp",
      images: [
        "/kahakudu_hero.webp",
        "/kahakudu_flatlay.webp",
        "/kahakudu_dynamic.webp",
        "/kahakudu_lifestyle.webp",
        "/kahakudu_minimalist.webp"
      ],
      pricing: {
        '25g': "145.00",
        '50g': "280.00",
        '100g': "550.00"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="mt-16 mb-6 relative flex flex-col items-center cursor-pointer group"
              onClick={() => onProductClick && onProductClick(product)}
            >
              {/* Main Light Card */}
              <div className="bg-white/70 backdrop-blur-lg flex-1 w-full rounded-t-2xl pb-20 pt-16 px-5 flex flex-col items-center relative z-10 shadow-xl border border-white/50">



                {/* Overlapping Product Image */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 z-30 group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-500">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply rounded-[32px]" />
                </div>

                {/* Dashed Border Container */}
                <div className="w-full border-[1.5px] border-dashed border-[#EADFC8] rounded-xl p-5 pt-20 flex flex-col items-center relative h-full bg-white/30">

                  {/* Title */}
                  <h3 className="text-[#2A2A2A] text-[15px] xl:text-base font-black tracking-wide uppercase mb-1 text-center whitespace-nowrap">
                    {product.name}
                  </h3>

                  {/* Ratings */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex text-[#e6b753]">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#2a2a2a]/50 font-bold">4.9</span>
                  </div>

                  {/* Description */}
                  <p className="text-[9px] 2xl:text-[10px] text-[#9A9286] text-center mb-4 w-full uppercase tracking-wide font-bold whitespace-nowrap">
                    {product.description}
                  </p>

                  {/* Badges & Weights */}
                  <div className="flex flex-col items-center gap-2.5 w-full border-t border-dashed border-[#EADFC8] pt-3 mt-auto">
                    <span className="flex items-center gap-1 text-[9px] font-black text-[#2E7D32] uppercase tracking-widest bg-[#4CAF50]/10 px-2 py-1 rounded border border-[#4CAF50]/20">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Organic
                    </span>

                    <div className="flex items-center gap-1.5 justify-center flex-wrap">
                      {Object.keys(product.pricing).slice(0, 3).map((size) => (
                        <span key={size} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#EADFC8] text-[#9A9286] bg-white/40">
                          {size}
                        </span>
                      ))}
                      {Object.keys(product.pricing).length > 3 && (
                        <span className="text-[9px] font-bold px-1 py-0.5 text-[#9A9286]">+</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Wrap Banner */}
              <div className="absolute bottom-2 -left-[4%] w-[108%] z-20 flex flex-col items-center">
                <button className="w-full bg-[#2a2a2a] py-4 text-center shadow-xl shadow-[#2a2a2a]/20 group-hover:bg-gradient-to-r group-hover:from-[#e6b753] group-hover:to-[#d6993a] transition-all duration-500 relative overflow-hidden">
                  <div className="text-[10px] uppercase tracking-widest text-[#9A9286] group-hover:text-white/80 mb-1 font-bold transition-colors">Starting at</div>
                  <div className="text-2xl font-black tracking-wider text-[#E6B754] group-hover:text-white transition-colors text-shine-light">
                    Rs {product.pricing[product.defaultSize]}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#e6b753] to-[#d6993a] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-black uppercase tracking-widest text-white">View Details</span>
                  </div>
                </button>
                {/* Wrap Shadows */}
                <div className="w-full flex justify-between absolute -bottom-2">
                  <div className="w-[3.7%] h-2 bg-[#111111]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
                  <div className="w-[3.7%] h-2 bg-[#111111]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }}></div>
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
