import React, { useState, useEffect } from 'react';

const ProductOverview = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedSize, setSelectedSize] = useState('100g'); // Default size for spices
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setActiveImageIndex(0);
  }, [product]);

  const productImages = product.images || [product.image, product.image, product.image, product.image];

  const handleQuantityChange = (type) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'increase') {
      setQuantity(quantity + 1);
    }
  };

  const availableSizes = Object.keys(product.pricing);

  useEffect(() => {
    if (product && product.defaultSize) {
      setSelectedSize(product.defaultSize);
    }
  }, [product]);

  const currentPriceNum = product.pricing[selectedSize] || product.pricing[product.defaultSize];
  const displayPrice = `Rs ${currentPriceNum}`;
  const oldPriceDisplay = `Rs ${Math.round(currentPriceNum * 1.25)}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-[#FAF5EC] pt-32">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column - Images */}
        <div className="flex flex-row gap-4 md:gap-6">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 md:gap-4 w-16 md:w-24 shrink-0">
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-0.5 ${activeImageIndex === index ? 'border-[#2a2a2a]' : 'border-transparent hover:border-[#2a2a2a]/30'}`}
              >
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#fcf5e5]">
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-[4/5] md:aspect-square bg-[#fcf5e5] rounded-[2rem] border border-[#f5e8cd] shadow-lg relative overflow-hidden group">
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#EADFC8] rounded-tl-xl pointer-events-none"></div>
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#EADFC8] rounded-br-xl pointer-events-none"></div>
            <img src={productImages[activeImageIndex]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 relative z-10" />
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col pt-4">
          <p className="text-[11px] text-[#9A9286] font-bold uppercase tracking-widest mb-2">Premium Spices</p>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#2a2a2a]">{product.name}</h1>
            <span className="bg-[#e6b753]/20 text-[#d6993a] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">In Stock</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-3xl font-bold text-[#e6b753]">{displayPrice}</span>
            <span className="text-lg text-[#2a2a2a]/40 line-through mb-1">{oldPriceDisplay}</span>
          </div>

          <p className="text-[#2a2a2a]/70 mb-8 leading-relaxed">
            Experience the authentic taste of Sri Lankan spices. {product.description}. Carefully harvested and processed to maintain natural oils and maximum flavor. Perfect for elevating your everyday cooking.
          </p>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="text-[11px] font-bold tracking-widest text-[#9A9286] uppercase mb-3">Size/Weight</h3>
            <div className="flex flex-wrap gap-3">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-all ${selectedSize === size
                      ? 'border-[#2A2A2A] bg-[#2A2A2A] text-white'
                      : 'border-[#EADFC8] text-[#2a2a2a] hover:border-[#2A2A2A]'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button className="bg-gradient-to-r from-[#2a2a2a] to-[#4a4a4a] text-white px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(42,42,42,0.3)] hover:shadow-[0_6px_20px_rgba(42,42,42,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex-1 md:flex-none">
              Add To Cart
            </button>

            <button className="bg-gradient-to-r from-[#e6b753] to-[#b9964e] text-[#2a2315] px-8 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(230,183,83,0.4)] hover:shadow-[0_6px_20px_rgba(230,183,83,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex-1 md:flex-none">
              Buy Now
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-col gap-2 pt-6 border-t border-[#2a2a2a]/10 text-sm">

            <div className="flex">
              <span className="font-bold text-[#2a2a2a] w-24">Tags:</span>
              <span className="text-[#2a2a2a]/60">Spices, Organic, Sri Lanka</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-[#2a2a2a] w-24">Share:</span>
              <div className="flex gap-4 text-[#2a2a2a]/60">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1877F2] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out ' + product.name + ' at ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="mt-20 border-t border-[#2a2a2a]/10">
        <div className="flex justify-center gap-8 md:gap-16 pt-6 mb-8 overflow-x-auto">
          {['Description', 'Additional Information'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`text-lg font-bold pb-2 border-b-2 transition-all whitespace-nowrap ${activeTab === tab.toLowerCase()
                  ? 'border-[#2a2a2a] text-[#2a2a2a]'
                  : 'border-transparent text-[#2a2a2a]/40 hover:text-[#2a2a2a]/70'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-[#2a2a2a]/70 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <p>
                Experience the finest {product.name.toLowerCase()}, sustainably sourced directly from the lush, spice-growing regions of Sri Lanka. Our premium {product.name.toLowerCase()} is celebrated for its unparalleled aroma, rich flavor profile, and numerous health benefits. Unlike generic alternatives, our product retains its essential oils, ensuring every pinch delivers maximum potency and culinary excellence.
              </p>
              <p>
                Whether you're enhancing a savory curry, baking a comforting dessert, or brewing a revitalizing cup of tea, this versatile spice is an indispensable addition to your pantry. Packaged carefully to seal in freshness, it arrives at your door bursting with the authentic taste of the island.
              </p>
              <ul className="space-y-3 mt-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#e6b753] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>100% pure, natural, and organically grown.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#e6b753] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>Rich in essential oils and authentic flavor.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#e6b753] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>Free from artificial colors, preservatives, or additives.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#e6b753] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span>Carefully packed to preserve freshness and aroma.</span>
                </li>
              </ul>
            </div>
          )}
          {activeTab === 'additional information' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 border-b border-[#2a2a2a]/10 pb-4">
                <span className="font-bold text-[#2a2a2a]">Weight</span>
                <span className="col-span-2">Available in 50g, 100g, 250g, 500g</span>
              </div>
              <div className="grid grid-cols-3 border-b border-[#2a2a2a]/10 pb-4">
                <span className="font-bold text-[#2a2a2a]">Origin</span>
                <span className="col-span-2">Sri Lanka</span>
              </div>
              <div className="grid grid-cols-3 pb-4">
                <span className="font-bold text-[#2a2a2a]">Storage</span>
                <span className="col-span-2">Store in a cool, dry place away from direct sunlight.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
